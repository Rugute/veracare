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

    const formData = await req.formData();
    const file: File | null = formData.get('logo') as File;
    const name = formData.get('name') as string;
    const address = formData.get('address') as string;
    const location = formData.get('location') as string;
    const phone = formData.get('phone') as string;
    let logoPath = null;

    if (file && file.name) {

      console.log("File name ndo hii " + file.name);
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fileName = `${Date.now()}_${file.name}`;
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      const filePath = path.join(uploadDir, fileName);

      await writeFile(filePath, buffer);
      logoPath = `/uploads/${fileName}`;
    }

    const updated = await prisma.company.update({
      where: { id: cid },
      data: {
        name,
        address,
        location,
        phone,
        ...(logoPath && { logo: logoPath }),
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
    await prisma.company.update({
      where: { id: cid },
      data: { voided: 1 },
    });
    
    return new Response(null, { status: 204 });
  } catch (err) {
    console.error("PATCH error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}