export async function getPaymentStatus(id: string) {
  const res = await fetch(`https://api.mercadopago.com/v1/payments/${id}`, {
    headers: { Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN!}` },
    next: { revalidate: 0 },
  });
  const data = await res.json();
  return { ok: res.ok, data };
}
