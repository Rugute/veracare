import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";
import { getCurrentUser } from "@/lib/auth";
import path from "path";
import { promises as fs } from "fs";
import { Decimal } from "@/app/generated/prisma/internal/prismaNamespaceBrowser";



// POST: Create a new course
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const courseId = formData.get("courseId") as string;
    const lessonName = formData.get("lessonName") as string;
    const lessonVideo = formData.get("lessonVideo") as string;
    const lessonDuration = formData.get("lessonDuration") as string;
    const lessonOrder = formData.get("lessonOrder") as string;
    const lessonDescription = formData.get("lessonDescription") as string;
   // const lessonDocument = formData.get("lessonDocument") as string;
    const file = formData.get("lessonDocument") as File | null;

    if (!lessonName) {
      return NextResponse.json({ message: "lessonName is required" }, { status: 400 });
    }

    // Handle file upload for photo
    let photoUrl: string | null = null;
    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
      const filePath = path.join(process.cwd(), "public", "uploads/lessons", fileName);

      await fs.mkdir(path.dirname(filePath), { recursive: true });
      await fs.writeFile(filePath, buffer);

      photoUrl = `/uploads/lessons/${fileName}`;
    }

    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    // Create course
    const lesson = await prisma.lesson.create({
      data: {
        lessonName,
        lessonVideo,
        lessonDuration,
        lessonOrder,
        lessonDescription,
        lessonDocument: photoUrl,
        course: { connect: { id: parseInt(courseId, 10) } },        
      },
    });

    return NextResponse.json(lesson, { status: 201 });
  } catch (err) {
    console.error("Error creating lesson:", err);
    return NextResponse.json({ message: "Failed to create lesson" }, { status: 500 });
  }
}

// GET: List lessons with pagination and optional search
export async function GET(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const size = parseInt(searchParams.get("size") || "10");
    const search = searchParams.get("search") || "";

    const where = {
      ...(search && {
        title: {
          contains: search,
          mode: "insensitive",
        },
      }),
      voided: 0, // Exclude deleted/voided courses
    };

    const [items, total] = await Promise.all([
      prisma.lesson.findMany({
        where,
        skip: (page - 1) * size,
        take: size,
        orderBy: { createdAt: "desc" },
      }),
      prisma.lesson.count({ where }),
    ]);

    return NextResponse.json({ items, total }, { status: 200 });
  } catch (err) {
    console.error("Error fetching courses:", err);
    return NextResponse.json({ message: "Failed to load courses" }, { status: 500 });
  }
}
