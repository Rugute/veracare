import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET(
  req: Request,
  { params }: { params: { code: string } }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const company = await prisma.company.findFirst({
      where: { code: params.code }, // or code field
    });

    if (!company) {
      return NextResponse.json(
        { message: "Company not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(company, { status: 200 });
  } catch (err) {
    console.error("GET BY CODE error:", err);
    return NextResponse.json(
      { message: "Failed to fetch company" },
      { status: 500 }
    );
  }
}
