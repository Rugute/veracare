import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";
import { getCurrentUser } from "@/lib/auth";
import path from "path";
import { promises as fs } from "fs";

// POST: Create a new course
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const startDate = formData.get("startDate") as string;
    const endDate = formData.get("endDate") as string;
    const courseId = formData.get("courseId") as string;
    const price = formData.get("price") as string;
    const file = formData.get("image") as File | null;
    const capacity = formData.get("capacity") as string;
    const location = formData.get("location") as string;
    const instructor = formData.get("instructor") as string;

    if (!title) {
      return NextResponse.json(
        { message: "Title is required" },
        { status: 400 },
      );
    }

    // Handle file upload for photo
    let photoUrl: string | null = null;
    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
      const filePath = path.join(
        process.cwd(),
        "public",
        "uploads/events",
        fileName,
      );

      await fs.mkdir(path.dirname(filePath), { recursive: true });
      await fs.writeFile(filePath, buffer);

      photoUrl = `/uploads/events/${fileName}`;
    }
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Create course
    const lesson = await prisma.event.create({
      data: {
        title,
        description,
        startDate,
        endDate,
        price,
        location,
        user: { connect: { id: parseInt(instructor) } },
        capacity: capacity ? parseInt(capacity, 10) : null,
        image: photoUrl,
        course: { connect: { id: parseInt(courseId, 10) } },
      },
    });

    return NextResponse.json(lesson, { status: 201 });
  } catch (err) {
    console.error("Error creating lesson:", err);
    return NextResponse.json(
      { message: "Failed to create lesson" },
      { status: 500 },
    );
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
      prisma.event.findMany({
        where,
        skip: (page - 1) * size,
        take: size,
        include: {
          course: true,
          user: {
            select: { id: true, firstName: true, lastName: true, email: true },
          },
        },
        // orderBy: { created_at: "desc" },
      }),
      prisma.event.count({ where }),
    ]);

    return NextResponse.json({ items, total }, { status: 200 });
  } catch (err) {
    console.error("Error fetching courses:", err);
    return NextResponse.json(
      { message: "Failed to load courses" },
      { status: 500 },
    );
  }
}
