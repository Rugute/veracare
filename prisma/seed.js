const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

const prisma = new PrismaClient();

async function main() {
  console.log("🏢 Seeding Started ...");

  console.log("🌱 Seeding roles...");

  const roles = [
    { name: "Admin", description: "System administrator with full access" },
    { name: "Student", description: "Learner with access to enrolled courses" },
    { name: "Instructor", description: "Trainer who creates and manages courses" },
  ];

  for (const role of roles) {
    await prisma.role.upsert({
      where: { name: role.name },
      update: {
        description: role.description,
      },
      create: {
        name: role.name,
        description: role.description,
      },
    });
  }

  console.log("✅ Roles Seeded.");
  /////////////////////////////////////////////

  console.log("🌱 Seeding Question Types...");

  const questionTypes = [
    { name: "Multiple Choice", description: "Multiple choice question type" },
    { name: "True/False", description: "True or false question type" },
    { name: "Short Answer", description: "Short answer question type" },
    { name: "Essay", description: "Essay question type" },
    { name: "Fill in the Blanks", description: "Fill in the blanks question type" },
    { name: "Matching", description: "Matching question type" },
    { name: "Numerical", description: "Numerical question type" },
    { name: "Likert Scale", description: "Likert scale question type" },

  ];

  for (const questionType of questionTypes) {
    await prisma.questionType.upsert({
      where: { name: questionType.name },
      update: {
        description: questionType.description,
      },
      create: {
        name: questionType.name,
        description: questionType.description,
      },
    });
  }

  console.log("✅ Question Types Seeded.");


  /////////////////////////////////////////////
  console.log("🏢 Seeding Completed.");
}


main()
  .catch((error) => {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
