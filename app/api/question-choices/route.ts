import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { questionId, choices, correctAnswers } = body;

    // Validate input
    if (!questionId || !Array.isArray(choices) || !Array.isArray(correctAnswers)) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    // Prepare data for insertion
    const dataToInsert = choices.map((choice) => ({
      questionId,
      choice,
      correctAnswer: correctAnswers.includes(choice) ? 1 : 0,
    }));

    console.log("Data to insert:", dataToInsert); // Debug log
    // Insert all choices at once
    const createdChoices = await prisma.questionChoices.createMany({
      data: dataToInsert,
      skipDuplicates: true, // optional
    });

    return NextResponse.json(
      { message: "Choices saved successfully", count: createdChoices.count },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving choices:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}



export async function GET(req: Request) {
  try {
    /*  const user = await getCurrentUser();
  
      if (!user) {
        return NextResponse.json({ message: "Unauthorized or user not found" }, { status: 401 });
      }
      */

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const size = parseInt(searchParams.get("size") || "10");
    const search = searchParams.get("search") || "";

    const where = {
      voided: 0,
      OR: search
        ? [
          { choice: { contains: search } },
        ]
        : undefined,
    };

    const [items, total] = await Promise.all([
      prisma.questionChoices.findMany({
        where,
        skip: (page - 1) * size,
        take: size,
        orderBy: { id: "asc" },
        include: { questions: true },

      }),
      prisma.questionChoices.count({ where }),
    ]);
    if (items.length === 0) {
      return NextResponse.json({ items: [], total: 0 }, { status: 200 });
    }

    return NextResponse.json({ items, total }, { status: 200 });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Question GET error:", err);
      return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } else {
      return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
  }
}

