import { getPayPalToken } from "@/lib/paypal";

export async function POST(req: Request) {
  const { amount } = await req.json();
  const token = await getPayPalToken();

  const res = await fetch(`${process.env.PAYPAL_BASE}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: { currency_code: "USD", value: amount },
        },
      ],
    }),
  });

  const data = await res.json();
  return Response.json(data);
}
