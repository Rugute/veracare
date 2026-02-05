import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ date: string }> }
) {
  try {
    const { date } = await params; // 🔴 MUST await

    const cid =  new Date(date);
    if (isNaN(cid.getTime())) {
      return NextResponse.json({ error: "Invalid date" }, { status: 400 });
    }

    cid.setHours(0, 0, 0, 0);

    const events = await prisma.event.findMany({
      where: {
        startDate: { gte: cid },
      },
      orderBy: { startDate: "asc" },
    });

    if (!events.length) {
      return NextResponse.json({ message: "No events found" }, { status: 404 });
    }
    return NextResponse.json(events);
  } catch (err) {
    console.error("GET error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}