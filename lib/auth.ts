import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";
import { JwtPayload } from "@/lib//types";

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const secret = process.env.JWT_SECRET;

  if (!token || !secret) return null;

  try {
    const decoded = jwt.verify(token, secret) as JwtPayload;

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    /*  include: {
        role: true,
        company: true,
        branch:true,
      },*/
    });

    if (!user) return null;

    return {
      id: user.id,
      username: user.email,
      email: user.email,
    /*  role: user.role.name,
      companyId: user.company?.id ?? null,
      company: user.company ?? null,
      branch: user.branch ?? null,
      branchId: user.branch?.id ?? null,
      status: user.company?.status ?? null,
      profilePhoto: user.profilePhoto ?? user.company?.logo ?? null,*/
    };
  } catch (err) {
    console.error("JWT verification failed:", err);
    return null;
  }
}
