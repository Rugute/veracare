import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import bcrypt from "bcryptjs";
import { ro } from "date-fns/locale";

export async function POST(req: Request) {
  try {

    //    const user = await getCurrentUser();
    const body = await req.json();

    const { firstName, lastName, phone, gender, email, password, companyid, dob } = body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        phone,
        gender,
        email,
        dob,
        password: hashedPassword,
      },
    });

    /* await prisma.category.update({
       where: { id: parseInt(category.id, 10) },
       data: {
         name: name,
       },
     });*/

    return NextResponse.json(user, { status: 201 });

  } catch {
    // console.error("Error creating product and variants:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}


export async function GET(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ message: "Unauthorized or user not found" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const size = parseInt(searchParams.get("size") || "10");
    const search = searchParams.get("search") || "";

    const where = {
      voided: 0,
      role: { name: "Instructor" },
      OR: search
        ? [
          { firstName: { contains: search } },
          { lastName: { contains: search } },
          { email: { contains: search } },
          { phone: { contains: search } },
        ]
        : undefined,
    };

    const [items, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip: (page - 1) * size,
        take: size,
        orderBy: { id: "asc" },
        include: { role: true },

      }),
      prisma.user.count({ where }),
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

