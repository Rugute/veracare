import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";

/*
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      attemptId,
      questionId,
      questionTypeId,
      choiceId,
      textAnswer,
    } = body;

    // fetch question (needed for marks)
    const question = await prisma.examQuestions.findUnique({
      where: { id: Number(questionId) },
      include: {
      // questionType: true,
      //  choices: true,
      },
    });

    if (!question) {
      return new Response("Question not found", { status: 404 });
    }

    let isCorrect: boolean | null = null;
    let score: number | null = null;

    // ===== AUTO-MARKING =====

    // MCQ / True-False / Likert
    if (["Multiple Choice", "True/False", "Likert Scale"].includes(question.questionType.name)) {
      const selectedChoice = question.choices.find(
        (c) => c.id === Number(choiceId)
      );

      if (!selectedChoice) {
        return new Response("Invalid choice", { status: 400 });
      }

      isCorrect = selectedChoice.isCorrect ?? null;

      // Likert has score but no correctness
      if (question.questionType.name === "Likert Scale") {
        score = selectedChoice.weight ?? 0;
        isCorrect = null;
      } else {
        score = isCorrect ? question.marks : 0;
      }
    }

    // Text-based answers
    else {
      const normalize = (s = "") => s.trim().toLowerCase();

      if (question.correctAnswer) {
        isCorrect =
          normalize(textAnswer) === normalize(question.correctAnswer);
        score = isCorrect ? question.marks : 0;
      } else {
        // Essay / manual grading
        isCorrect = null;
        score = null;
      }
    }

    // ===== SAVE ANSWER =====

    const examAnswer = await prisma.examAnswer.create({
      data: {
        attempt: { connect: { id: Number(attemptId) } },
        examQuestion: { connect: { id: Number(questionId) } },
        choiceId: choiceId ? Number(choiceId) : null,
        textAnswer: textAnswer ?? null,
        isCorrect,
        score,
      },
    });

    return Response.json(examAnswer, { status: 201 });
  } catch (error) {
    console.error("Create exam answer error:", error);
    return new Response("Failed to save exam answer", { status: 500 });
  }
}
*/

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
      /*  OR: search
          ? [
            { exam: { contains: search } }
          ]
          : undefined, */
    };

    const [items, total] = await Promise.all([
      prisma.examAttempt.findMany({
        where,
        skip: (page - 1) * size,
        take: size,
        orderBy: { id: "asc" },
        include: { user: true },

      }),
      prisma.examAttempt.count({ where }),
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

