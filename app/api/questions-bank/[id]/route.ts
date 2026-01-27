import { NextRequest } from 'next/server';
import { prisma } from "@/lib/prisma";
import { writeFile } from "fs/promises";
import path from "path";


export async function DELETE(req: NextRequest, ctx: { params: Promise<{ id: number }> }) {
  const { id } = await ctx.params;
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
      courseId,
      content,
      mandatory
    } = body;

    const updated = await prisma.question.update({
      where: { id: cid },
      data: {
        course: { connect: { id: courseId } },
        content: content,
        mandatory: mandatory

      },
    });

    return Response.json(updated);
  } catch (err) {
    console.error("PUT error:", err);
    return new Response("Failed to update company", { status: 500 });
  }
}

export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  try {
    const cid = parseInt(id, 10);
    await prisma.requirement.update({
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
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cid = Number(params.id); // convert here

    if (isNaN(cid)) {
      return new Response("Invalid requirement id", { status: 400 });
    }

    const requirement = await prisma.requirement.findUnique({
      where: { id: cid },
    });

    if (!requirement) {
      return new Response("Requirement not found", { status: 404 });
    }

    return Response.json(requirement);
  } catch (err) {
    console.error("GET error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
