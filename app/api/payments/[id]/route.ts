import { NextRequest } from 'next/server';
import { prisma } from "@/lib/prisma";
import { writeFile } from "fs/promises";
import path from "path";


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

    const updated = await prisma.exam.update({
      where: { id: cid },
      data: {
        title: title,
        description: description,
        courseId: courseId,
        duration: duration,    // in minutes
        lessonId: lessonId,
        examType: examType,       // default value in JS
        totalMarks: totalMarks,
        isPublished: isPublished // default value in JS
      },
    });

    return Response.json(updated);
  } catch (err) {
    console.error("PUT error:", err);
    return new Response("Failed to update Exam", { status: 500 });
  }
}

export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  try {
    const cid = parseInt(id, 10);
    await prisma.exam.update({
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
    const cid = Number((await params).id); // convert here

    if (isNaN(cid)) {
      return new Response("Invalid exam id", { status: 400 });
    }

    const categories = await prisma.exam.findUnique({
      where: { id: cid },
    });

    if (!categories) {
      return new Response("Exam not found", { status: 404 });
    }

    return Response.json(categories);
  } catch (err) {
    console.error("GET error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
