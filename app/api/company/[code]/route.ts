import { NextRequest } from 'next/server';
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { code: string } }
) {
  try {
    const cid = params.code;
    const company = await prisma.company.findFirst({
      where: { code: cid },
    });

    if (!company) {
      return new Response("Company not found", { status: 404 });
    }

    return Response.json(company);
  } catch (err) {
    console.error("GET error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
