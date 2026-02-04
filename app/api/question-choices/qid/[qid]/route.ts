import { NextRequest } from 'next/server';
import { prisma } from "@/lib/prisma";
import { writeFile } from "fs/promises";
import path from "path";


export async function GET(
 req: NextRequest, ctx: { params: Promise<{ qid: string }> })
 {
  try {
  const { qid } = await ctx.params;

  if (!qid) {
    return new Response(JSON.stringify({ error: "Question ID is required" }), {
      status: 400,
    });
  }

    const cid = Number(qid);
    if (isNaN(cid)) {
      return new Response(JSON.stringify({ error: "Invalid Question ID" }), {
        status: 400,
      });
    }

    const questions = await prisma.questionChoices.findFirst({
      where: { questionId: cid },
      include: { questions: true },
    });

    if (!questions) {
      return new Response(JSON.stringify({ error: "Questions not found" }), { status: 404 });
    }

    return Response.json(questions);
  } catch (err) {
    console.error("GET error:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
