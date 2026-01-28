import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";

export async function POST(req: Request) {
  try {

    //    const user = await getCurrentUser();
    const body = await req.json();
    const {
      title,
      description,
      courseId,
      duration,    // in minutes
      lessonId,
      examType,       // default value in JS
      totalMarks,
      isPublished // default value in JS
    } = body;


    const exam = await prisma.exam.create({
      data: {
        title,
        description,
        course: { connect: { id: courseId } },
        duration,    // in minutes
        lessonId,
        lesson: { connect: { id: lessonId } },
        examType,       // default value in JS
        totalMarks,
        isPublished,
        voided: 0,
        // createdBy: 1,
      },
    });

    /* await prisma.category.update({
       where: { id: parseInt(category.id, 10) },
       data: {
         name: name,
       },
     });*/

    return NextResponse.json(exam, { status: 201 });

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
    // const user = await getCurrentUser();

    /* if (!user) {
       return NextResponse.json({ message: "Unauthorized or user not found" }, { status: 401 });
     }*/

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const size = parseInt(searchParams.get("size") || "10");
    const search = searchParams.get("search") || "";

    const where = {
      voided: 0,
      OR: search
        ? [
          { name: { contains: search } },
          { description: { contains: search } },
        ]
        : undefined,
    };

    const [items, total] = await Promise.all([
      prisma.exam.findMany({
        where,
        skip: (page - 1) * size,
        take: size,
        orderBy: { id: "asc" },
        // include: { course: true },

      }),
      prisma.exam.count({ where }),
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

