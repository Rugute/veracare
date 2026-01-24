import { NextRequest } from 'next/server';
import { prisma } from "@/lib/prisma";
import { writeFile } from "fs/promises";
import path from "path";
// Helper to generate slug from title
function generateSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

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
    const title = formData.get("title") as string;
    const description = formData.get("description") as string | null;
    const published = formData.get("published") === "1" ? 1 : 0;
    const category = formData.get("category") ? parseInt(formData.get("category") as string) : null;
    const file = formData.get("file") as File | null;

  let photoUrl: string | null = null;
  
    if (file && file.name) {

      console.log("File name ndo hii " + file.name);
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fileName = `${Date.now()}_${file.name}`;
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      const filePath = path.join(uploadDir, fileName);

      await writeFile(filePath, buffer);
      photoUrl = `/uploads/${fileName}`;
    }

    const updated = await prisma.course.update({
      where: { id: cid },
      data: {
        title,
        slug: generateSlug(title),
        description,
        published: published === 1,
        photo: photoUrl,
        categoryId: category,
       
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

export async function GET(
  req: NextRequest,
  { params }: { params: { code: string } }
) {
  try {
    const cid = params.code;
    const company = await prisma.company.findFirst({
      where: { code: cid },
    });

    if (!company) {
      return new Response("Company not found", { status: 404 });
    }

    return Response.json(company);
  } catch (err) {
    console.error("GET error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}