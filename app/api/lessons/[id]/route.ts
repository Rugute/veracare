import { NextRequest, NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";
import { writeFile } from "fs/promises";
import path from "path";
import { promises as fs } from "fs";


export async function DELETE(request: Request,
  { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    console.log("Deleting Record ID:", id);
    //await prisma.branch.delete({ where: { id } });
    return new Response(null, { status: 204 });
  } catch (err) {
    console.error("DELETE error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function PUT(req: Request, ctx: { params: Promise<{ id: string }> }) {
  try {

    const { id } = await ctx.params;
    const cid = parseInt(id, 10);

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


    const updated = await prisma.lesson.update({
      where: { id: cid },
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

    return Response.json(updated);
  } catch (err) {
    console.error("PUT error:", err);
    return new Response("Failed to update Lesson", { status: 500 });
  }
}

export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  try {
    const cid = parseInt(id, 10);
    await prisma.lesson.update({
      where: { id: cid },
      data: { voided: 1 },
    });

    return new Response(null, { status: 204 });
  } catch (err) {
    console.error("PATCH error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function GET(
 request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const cid = (await params).id;
    const lesson = await prisma.lesson.findUnique({
      where: { id: parseInt(cid, 10) },
      include: { course: true },
    });

    if (!lesson) {
      return new Response("Lesson not found", { status: 404 });
    }

    return Response.json(lesson);
  } catch (err) {
    console.error("GET error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}