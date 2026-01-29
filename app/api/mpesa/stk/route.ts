import { NextResponse } from "next/server";
import axios from "axios";
import { getMpesaToken } from "@/lib/mpesa";

export async function POST(req: Request) {
  const { phone, amount } = await req.json();
  const token = await getMpesaToken();

  const timestamp = new Date()
    .toISOString()
    .replace(/[^0-9]/g, "")
    .slice(0, 14);
/*
  const password = Buffer.from(
   // process.env.MPESA_SHORTCODE + process.env.MPESA_PASSKEY  + timestamp 
  ).toString("base64");*/

  const password = "sadsfs"

  const res = await axios.post(
    `${process.env.MPESA_BASE_URL}/mpesa/stkpush/v1/processrequest`,
    {
      BusinessShortCode: process.env.MPESA_SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: phone,
      PartyB: process.env.MPESA_SHORTCODE,
      PhoneNumber: phone,
      CallBackURL: process.env.MPESA_CALLBACK_URL,
      AccountReference: "Kichwen",
      TransactionDesc: "Payment",
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return NextResponse.json(res.data);
}
