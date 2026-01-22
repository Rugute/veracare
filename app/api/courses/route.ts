import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";
import { getCurrentUser } from "@/lib/auth";
import path from "path";
import { promises as fs } from "fs";

// Helper to generate slug from title
function generateSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

// POST: Create a new course
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string | null;
    const published = formData.get("published") === "1" ? 1 : 0;
    const category = formData.get("category") ? parseInt(formData.get("category") as string) : null;
    const file = formData.get("file") as File | null;

    if (!title) {
      return NextResponse.json({ message: "Title is required" }, { status: 400 });
    }

    // Handle file upload for photo
    let photoUrl: string | null = null;
    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
      const filePath = path.join(process.cwd(), "public", "uploads", fileName);

      await fs.mkdir(path.dirname(filePath), { recursive: true });
      await fs.writeFile(filePath, buffer);

      photoUrl = `/uploads/${fileName}`;
    }

    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Create course
    const course = await prisma.course.create({
      data: {
        title,
        slug: generateSlug(title),
        description,
        published: published === 1,
        photo: photoUrl,
        categoryId: category,
        uuid: uuidv4(),
        voided: 0,
        createdById: user.id, // Ensure your Prisma schema has createdById
      },
    });

    return NextResponse.json(course, { status: 201 });
  } catch (err) {
    console.error("Error creating course:", err);
    return NextResponse.json({ message: "Failed to create course" }, { status: 500 });
  }
}

// GET: List courses with pagination and optional search
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
      prisma.course.findMany({
        where,
        skip: (page - 1) * size,
        take: size,
        orderBy: { created_at: "desc" },
      }),
      prisma.course.count({ where }),
    ]);

    return NextResponse.json({ items, total }, { status: 200 });
  } catch (err) {
    console.error("Error fetching courses:", err);
    return NextResponse.json({ message: "Failed to load courses" }, { status: 500 });
  }
}
