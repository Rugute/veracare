import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";
import { getCurrentUser } from "@/lib/auth";
import path from "path";
import { promises as fs } from "fs";

export async function POST(req: Request) {
  const formData = await req.formData();
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const license = formData.get("license") as string;
  const phone = formData.get("phone") as string;
  const location = formData.get("location") as string;
  const address = formData.get("address") as string;
  const status = formData.get("status") as string;
  const file = formData.get("file") as File;

  let fileUrl = null;

  if (file) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
    const filePath = path.join(process.cwd(), "public", "uploads", fileName);

    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, buffer);

    fileUrl = `/uploads/${fileName}`;
  }

  const user = await getCurrentUser();
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const company = await prisma.company.create({
    data: {
      name,
      email,
      phone,
      location,
      address,
      status: "TRIAL",
      logo: fileUrl,
      createdBy: user.id,
      uuid: uuidv4(),
      voided:0
    },
  });

  return Response.json(company, { status: 201 });
}

// List companies with pagination and optional search
export async function GET(req: Request) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json(
      { message: "Unauthorized or user not found" },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const size = parseInt(searchParams.get("size") || "10");
  const search = searchParams.get("search") || "";

  const where = {
    ...(search && {
      name: {
        contains: search,
        mode: "insensitive",
      },
    }),
  };

  try {
    const [items, total] = await Promise.all([
      prisma.company.findMany({
        where,
        skip: (page - 1) * size,
        take: size,
        orderBy: { name: "asc" },
      }),
      prisma.company.count({ where }),
    ]);

    return NextResponse.json({ items, total }, { status: 200 });
  } catch (err) {
    console.error("Error fetching companies:", err);
    return NextResponse.json({ message: "Failed to load companies" }, { status: 500 });
  }
}
