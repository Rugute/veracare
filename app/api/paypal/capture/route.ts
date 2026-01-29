import { getPayPalToken } from "@/lib/paypal";

export async function POST(req: Request) {
  const { orderID } = await req.json();
  const token = await getPayPalToken();

  const res = await fetch(
    `${process.env.PAYPAL_BASE}/v2/checkout/orders/${orderID}/capture`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  const data = await res.json();
  return Response.json(data);
}
