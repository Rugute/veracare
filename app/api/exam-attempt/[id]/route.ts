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
      examId,
      userId,
      score,
      startedAt,
      endedAt,
      totalMarks,
      percentage,
      status
    } = body;

    const updated = await prisma.examAttempt.update({
      where: { id: cid },
      data: {
        exam: { connect: { id: examId } },
        user: { connect: { id: userId } },
        score: score,
        startedAt: startedAt,
        endedAt: endedAt,
        totalMarks: totalMarks,
        percentage: percentage,
        status: status
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
    await prisma.examAttempt.update({
      where: { id: cid },
      data: { voided: 1 },
    });

    return new Response(null, { status: 204 });
  } catch (err) {
    console.error("PATCH error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
export async function GET( request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const cid = Number((await params).id); // convert here

    if (isNaN(cid)) {
      return new Response("Invalid exam id", { status: 400 });
    }

    const examAttempt = await prisma.examAttempt.findUnique({
      where: { id: cid },
    });

    if (!examAttempt) {
      return new Response("Exam not found", { status: 404 });
    }

    return Response.json(examAttempt);
  } catch (err) {
    console.error("GET error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
