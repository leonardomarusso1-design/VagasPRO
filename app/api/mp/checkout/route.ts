import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { plan = "PRO", hasBump = false } = body as {
      plan?: "PRO" | "BASIC";
      hasBump?: boolean;
    };

    if (!process.env.MP_ACCESS_TOKEN) {
      return new Response(JSON.stringify({ error: "MP_ACCESS_TOKEN não configurada" }), {
        status: 500,
      });
    }

    const amount =
      plan === "PRO" ? 2270 : hasBump ? 840 : 570;

    const getBaseUrl = () => {
      const raw = process.env.NEXTAUTH_URL;
      if (raw) {
        try {
          const u = new URL(raw);
          if (u.protocol.startsWith("http")) return u.origin;
        } catch {}
      }
      if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
      return "http://localhost:3000";
    };
    const baseUrl = getBaseUrl();

    const pref = {
      items: [
        {
          title: `VagasPRO ${plan}${hasBump ? " + Bump" : ""}`,
          quantity: 1,
          currency_id: "BRL",
          unit_price: amount / 100,
        },
      ],
      back_urls: {
        success: `${baseUrl}?success=true&plan=${plan}&bump=${hasBump ? "true" : "false"}`,
        failure: `${baseUrl}?success=false`,
        pending: `${baseUrl}?success=false`,
      },
      auto_return: "approved",
      payment_methods: {
        default_payment_method_id: "pix",
      },
      statement_descriptor: "VagaPRO",
    };

    const res = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pref),
    });

    const data = await res.json();
    if (!res.ok) {
      return new Response(JSON.stringify({ error: data }), { status: 400 });
    }

    return new Response(JSON.stringify({ url: data.init_point || data.sandbox_init_point, id: data.id }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e?.message || "Erro desconhecido" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
