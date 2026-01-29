export async function POST(req: Request) {
  const data = await req.json();
  console.log("MPESA CALLBACK:", JSON.stringify(data, null, 2));

  // TODO: Save to DB, mark payment complete

  return Response.json({ ResultCode: 0, ResultDesc: "Accepted" });
}
