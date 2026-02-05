import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { NextRequest } from 'next/server';
import { start } from "repl";


export async function GET(
  req: NextRequest, ctx: { params: Promise<{ date: string }> }) {
  const { date } = await ctx.params;
   const cid =  new Date(date);
    if (isNaN(cid.getTime())) {
      return NextResponse.json({ error: "Invalid date" }, { status: 400 });
    }

    cid.setHours(0, 0, 0, 0);
  try {

    const where = {
      startDate: { gte: cid },
      voided: 0,
    };

    const [items] = await Promise.all([
      prisma.event.findMany({
        where,
        orderBy: { startDate: "desc" },
        include: {
          course: true,
          user: { select: { id: true, firstName: true, lastName: true, email: true } },
        }
      })]);

    return NextResponse.json({ items }, { status: 200 });
  } catch (err) {
    console.error("Error fetching Events:", err);
    return NextResponse.json({ message: "Failed to load Events" }, { status: 500 });
  }
}