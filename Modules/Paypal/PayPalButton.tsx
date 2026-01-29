"use client";

import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

export default function PayPalButton({ amount }: { amount: string }) {
  return (
    <PayPalScriptProvider
      options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID! }}
    >
      <PayPalButtons
        createOrder={async () => {
          const res = await fetch("/api/paypal/create-order", {
            method: "POST",
            body: JSON.stringify({ amount }),
          });
          const data = await res.json();
          return data.id;
        }}
        onApprove={async (data) => {
          const res = await fetch("/api/paypal/capture", {
            method: "POST",
            body: JSON.stringify({ orderID: data.orderID }),
          });
          const details = await res.json();
          alert("Payment Successful!");
          console.log(details);
        }}
      />
    </PayPalScriptProvider>
  );
}
