import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const paymentId = url.searchParams.get("payment_id");
    if (!paymentId) {
      return NextResponse.json({ error: "payment_id ausente" }, { status: 400 });
    }
    if (!process.env.MP_ACCESS_TOKEN) {
      return NextResponse.json({ error: "MP_ACCESS_TOKEN não configurada" }, { status: 500 });
    }
    const res = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      headers: {
        Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
      },
    });
    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json({ error: data }, { status: 400 });
    }
    return NextResponse.json({ status: data?.status || "unknown" }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Erro desconhecido" }, { status: 500 });
  }
}
