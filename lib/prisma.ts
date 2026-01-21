import { PrismaClient } from "@/app/generated/prisma/client";

const globalForPrisma = global as unknown as { prisma?: PrismaClient };

// Make sure DATABASE_URL exists in .env
const databaseUrl = process.env.DATABASE_URL!;
if (!databaseUrl) {
  throw new Error("DATABASE_URL environment variable not set");
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    accelerateUrl: databaseUrl, // required in Prisma 7
    log: process.env.NODE_ENV === "development" ? ["query", "warn", "error"] : ["warn", "error"],
  });

// Cache in dev to prevent hot reload issues
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
