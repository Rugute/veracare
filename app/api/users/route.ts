import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";
import { getCurrentUser } from "@/lib/auth";
import path from "path";
import { promises as fs } from "fs";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
<<<<<<< HEAD
    //    const user = await getCurrentUser();
    const body = await req.json();

    const {
      firstName,
      lastName,
      phone,
      gender,
      email,
      password,
      companyid,
      dob,
    } = body;
=======

    const formData = await req.formData();
    
      console.log(formData);
      const firstName = formData.get("firstName") as string;
      const lastName = formData.get("lastName") as string;
      const phone = formData.get("phone") as string;
      const gender = formData.get("gender") as string;
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      const companyid = formData.get("companyid") as string;
      const dob = formData.get("dob") as string;
      const file = formData.get("photo") as File;

    
      let fileUrl = null;
    
      if (file) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
        const filePath = path.join(process.cwd(), "public", "uploads/users", fileName);
    
        await fs.mkdir(path.dirname(filePath), { recursive: true });
        await fs.writeFile(filePath, buffer);

        fileUrl = `/uploads/users/${fileName}`;
      }

    //    const user = await getCurrentUser();
    //const body = await req.json();

    //const { firstName, lastName, phone, gender, email, password, companyid, dob,photo } = body;
>>>>>>> 32146bf926de3da8db6f2bfc58bc933037c05a5a

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        phone,
        gender,
        email,
        dob,
        photo: fileUrl? fileUrl : null,
        companyId: companyid ? parseInt(companyid, 10) : null,
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
      { status: 500 },
    );
  }
}

export async function GET(req: Request) {
  try {
   /* const user = await getCurrentUser();

    if (!user) {
<<<<<<< HEAD
      return NextResponse.json(
        { message: "Unauthorized or user not found" },
        { status: 401 },
      );
    }
=======
      return NextResponse.json({ message: "Unauthorized or user not found" }, { status: 401 });
    }*/
>>>>>>> 7ba82988cfc1c72df4114d84387406a5bdb30b57

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const size = parseInt(searchParams.get("size") || "10");
    const search = searchParams.get("search") || "";

    const where = {
      voided: 0,
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
<<<<<<< HEAD
        // include: { course: true },
=======
        include: { role: true },

>>>>>>> 7ba82988cfc1c72df4114d84387406a5bdb30b57
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
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 },
      );
    } else {
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 },
      );
    }
  }
}
