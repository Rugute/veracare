import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";
import { getCurrentUser } from "@/lib/auth";
import path from "path";
import { promises as fs } from "fs";
import bcrypt from "bcryptjs";


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

    const updated = await prisma.user.update({
      where: { id: cid },
      data: {
         firstName,
        lastName,
        phone,
        gender,
        email,
        dob,
        photo: fileUrl? fileUrl : null,
        companyId: companyid ? parseInt(companyid, 10) : null,
      },
    });

    return Response.json(updated);
  } catch (err) {
    console.error("PUT error:", err);
    return new Response("Failed to update User", { status: 500 });
  }
}

export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  try {
    const cid = parseInt(id, 10);
    await prisma.user.update({
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
      return new Response("Invalid User id", { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: cid },
    });

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    return Response.json(user);
  } catch (err) {
    console.error("GET error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
