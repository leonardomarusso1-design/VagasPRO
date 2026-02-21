import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const plan = String(body?.plan || "BASIC").toUpperCase();
    const handle = process.env.ASAAS_HANDLE || "";
    const base = process.env.ASAAS_CHECKOUT_LINK;
    if (!base) return NextResponse.json({ error: "Link do checkout Asaas não configurado" }, { status: 500 });
    const url = new URL(base);
    if (handle && !url.searchParams.get("handle")) url.searchParams.set("handle", handle);
    const buyerEmail = String(body?.buyerEmail || "");
    const nsu = `${buyerEmail || "anon"}-vagaspro-${plan.toLowerCase()}-${Date.now()}`;
    url.searchParams.set("order_nsu", nsu);
    url.searchParams.set("external_reference", `vagaspro-${plan.toLowerCase()}`);
    return NextResponse.json({ url: url.toString() });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "erro" }, { status: 500 });
  }
}
