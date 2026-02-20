import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { plan = "PRO", hasBump = false } = body as {
      plan?: "PRO" | "BASIC";
      hasBump?: boolean;
    };

    if (!process.env.STRIPE_SECRET_KEY) {
      return new Response(
        JSON.stringify({ error: "STRIPE_SECRET_KEY não configurada" }),
        { status: 500 }
      );
    }

    const amount =
      plan === "PRO" ? 2270 : hasBump ? 840 : 570; // valores em centavos BRL

    const baseUrl =
      process.env.NEXTAUTH_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

    const form = new URLSearchParams();
    form.append("mode", "payment");
    form.append("success_url", `${baseUrl}?success=true&plan=${plan}&bump=${hasBump ? "true" : "false"}`);
    form.append("cancel_url", `${baseUrl}?success=false`);
    form.append("payment_method_types[]", "pix");
    form.append("line_items[0][price_data][currency]", "brl");
    form.append("line_items[0][price_data][product_data][name]", `VagasPRO ${plan}${hasBump ? " + Bump" : ""}`);
    form.append("line_items[0][price_data][unit_amount]", String(amount));
    form.append("line_items[0][quantity]", "1");

    const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: form.toString(),
    });

    const data = await res.json();
    if (!res.ok) {
      return new Response(JSON.stringify({ error: data }), { status: 400 });
    }

    return new Response(JSON.stringify({ url: data.url, id: data.id }), {
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
