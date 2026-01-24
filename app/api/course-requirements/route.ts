import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";

export async function POST(req: Request) {
  try {

//    const user = await getCurrentUser();
    const body = await req.json();
    const {
      courseId,
      content,
      mandatory
    } = body;



    const requirement = await prisma.requirement.create({
      data: {
        course: { connect: { id: courseId } },
        content: content,
        mandatory: mandatory
      },
    });

    await prisma.requirement.update({
      where: { id: parseInt(courseId, 10) },
      data: {
         content: content,
        mandatory: mandatory
      },
    });

    return NextResponse.json(requirement, { status: 201 });

  } catch {
    // console.error("Error creating product and variants:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}


export async function GET(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ message: "Unauthorized or user not found" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const size = parseInt(searchParams.get("size") || "10");
    const search = searchParams.get("search") || "";

    const where = {
      voided: 0,
      OR: search
        ? [
          { content: { contains: search } },
        ]
        : undefined,
    };

    const [items, total] = await Promise.all([
      prisma.requirement.findMany({
      where,
        skip: (page - 1) * size,
        take: size,
        orderBy: { id: "asc" },
        include: { course: true },

      }),
      prisma.requirement.count({ where }),
    ]);
    if (items.length === 0) {
      return NextResponse.json({ items: [], total: 0 }, { status: 200 });
    }

    return NextResponse.json({ items, total }, { status: 200 });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("requirements GET error:", err);
      return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } else {
      return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
  }
}

