import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
function isPaid(payload: any) {
  const s = String(payload?.status || payload?.payment_status || "").toLowerCase();
  const paidFlag = payload?.paid === true;
  return paidFlag || ["confirmed", "received", "received_in_cash", "paid"].includes(s);
}
export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get("x-asaas-token") || req.headers.get("authorization") || "";
    if (process.env.ASAAS_WEBHOOK_TOKEN && token.replace("Bearer ", "") !== process.env.ASAAS_WEBHOOK_TOKEN) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
    const body = await req.json().catch(() => ({}));
    const paid = isPaid(body) || isPaid(body?.payment) || isPaid(body?.invoice);
    if (!paid) return NextResponse.json({ ok: true });
    const email = body?.customer?.email || body?.payerEmail || body?.payment?.customer?.email || body?.invoice?.customer?.email || "";
    const planTag = String(body?.order_nsu || body?.external_reference || "").toLowerCase();
    const plan = planTag.includes("pro") ? "pro" : "basic";
    if (!email) return NextResponse.json({ ok: true });
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE!);
    await supabase
      .from("profiles")
      .update({ plan, plan_status: "active" })
      .eq("email", email);
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "erro" }, { status: 500 });
  }
}
