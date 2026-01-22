import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import "dotenv/config.js";

const seedUser = async () => {
  const hashPassword = await bcrypt.hash("@Gkl11252", 10);

  try {
    console.log("Seeding...");

    await prisma.user.upsert({
      where: {
        email: "leleigideon97@gmail.com",
      },
      create: {
        email: "leleigideon97@gmail.com",
        password: hashPassword,
      },
      update: {
        password: hashPassword,
      },
    });
    console.log("User seeded");
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
};

seedUser();
