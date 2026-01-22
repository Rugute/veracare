import { prisma } from "@/lib/prisma";
import { NextRequest } from 'next/server';

export async function GET(
 req: NextRequest, ctx: { params: Promise<{ code: string }> })
 {
  const { code } = await ctx.params;

  if (!code) {
    return new Response(JSON.stringify({ error: "Company code is required" }), {
      status: 400,
    });
  }

  // Use findUnique if code is unique in Prisma, otherwise findFirst
  const company = await prisma.company.findUnique({
    where: { code },
  });

  if (!company) {
    return new Response(JSON.stringify({ error: "Company not found" }), {
      status: 404,
    });
  }

  return new Response(JSON.stringify(company), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
