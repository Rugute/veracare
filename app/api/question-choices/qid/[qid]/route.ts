import { NextRequest } from 'next/server';
import { prisma } from "@/lib/prisma";
import { writeFile } from "fs/promises";
import path from "path";

export async function GET(
  req: NextRequest,
  { params }: { params: { qid: string } }
) {
  try {
    const cid = Number(params.qid); // convert here

    if (isNaN(cid)) {
      return new Response("Invalid requirement id", { status: 400 });
    }

    const questions = await prisma.questionChoices.findMany({
      where: { questionId: cid },
    });

    if (!questions || questions.length === 0) {
      return new Response("Questions choices not found", { status: 404 });
    }

    return Response.json(questions);
  } catch (err) {
    console.error("GET error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
