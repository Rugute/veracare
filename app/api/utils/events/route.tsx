import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    /* const user = await getCurrentUser();
     if (!user) {
       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
     }*/
    const where = {
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
    console.error("Error fetching Question:", err);
    return NextResponse.json({ message: "Failed to load Question" }, { status: 500 });
  }
}