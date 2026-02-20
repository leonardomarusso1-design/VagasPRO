import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { plan = "PRO", hasBump = false, buyerEmail } = body as {
      plan?: "PRO" | "BASIC";
      hasBump?: boolean;
      buyerEmail?: string;
    };

    if (!process.env.MP_ACCESS_TOKEN) {
      return new Response(JSON.stringify({ error: "MP_ACCESS_TOKEN não configurada" }), {
        status: 500,
      });
    }

    const amount = plan === "PRO" ? 2270 : hasBump ? 840 : 570;

    const res = await fetch("https://api.mercadopago.com/v1/payments", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        transaction_amount: amount / 100,
        description: `VagasPRO ${plan}${hasBump ? " + Bump" : ""}`,
        payment_method_id: "pix",
        payer: buyerEmail ? { email: buyerEmail } : {},
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      return new Response(JSON.stringify({ error: data }), { status: 400 });
    }

    const qrBase64 =
      data?.point_of_interaction?.transaction_data?.qr_code_base64 || null;
    const qrCode =
      data?.point_of_interaction?.transaction_data?.qr_code || null;
    const paymentId = data?.id;

    return new Response(
      JSON.stringify({ qr_base64: qrBase64, qr_code: qrCode, payment_id: paymentId }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e?.message || "Erro desconhecido" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
