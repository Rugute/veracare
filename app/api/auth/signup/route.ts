
export const dynamic = "force-dynamic"; 

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { firstName, lastName, phone, gender, email, password,companyid } = await request.json();

    // Lookup user in DB
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user) {
      return NextResponse.json({ error: "Email Already Exists" }, { status: 401 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user
    if(companyid){
      const company = await prisma.company.findUnique({
        where: { id: companyid },
      });

    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        phone,
        gender,
        email,
        dob,
        password: hashedPassword,
        company: { connect: { id: companyid } },
      },
    });
    }else{
      const newUser = await prisma.user.create({
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
  }

    return NextResponse.json({ message: "User created successfully" });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
