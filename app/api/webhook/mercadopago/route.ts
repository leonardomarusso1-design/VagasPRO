import { NextRequest, NextResponse } from "next/server";
import { getPaymentStatus } from "@/lib/mercadopago";
import { createClient } from "@supabase/supabase-js";
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const paymentId = body?.data?.id || body?.id;
    if (!paymentId) return NextResponse.json({ error: "paymentId ausente" }, { status: 400 });
    const check = await getPaymentStatus(String(paymentId));
    if (!check.ok) return NextResponse.json({ error: check.data }, { status: 400 });
    const status = check.data?.status;
    const ext = check.data?.external_reference || "";
    const parts = String(ext).split("-");
    const plan = parts[1]?.toLowerCase() === "pro" ? "PRO" : "BASIC";
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE!);
    if (status === "approved") {
      const email = check.data?.payer?.email;
      if (!email) return NextResponse.json({ ok: true });
      await supabase
        .from("profiles")
        .update({ plan: plan === "PRO" ? "pro" : "basic", plan_status: "active", mercadopago_subscription_id: String(paymentId) })
        .eq("email", email);
    }
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "erro" }, { status: 500 });
  }
}
