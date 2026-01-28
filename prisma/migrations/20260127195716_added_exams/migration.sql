/*
  Warnings:

  - You are about to drop the column `is_correct` on the `questionchoices` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `questionchoices` DROP COLUMN `is_correct`,
    ADD COLUMN `correctAnswer` INTEGER NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `Exam` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `courseId` INTEGER NULL,
    `duration` INTEGER NULL,
    `lessonId` INTEGER NULL,
    `examType` INTEGER NULL DEFAULT 0,
    `totalMarks` INTEGER NULL,
    `isPublished` BOOLEAN NOT NULL DEFAULT false,
    `voided` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ExamQuestions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `examId` INTEGER NOT NULL,
    `questionId` INTEGER NOT NULL,
    `marks` INTEGER NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ExamAttempt` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `examId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `score` INTEGER NULL,
    `startedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `endedAt` DATETIME(3) NULL,
    `totalMarks` INTEGER NULL,
    `percentage` DOUBLE NULL,
    `status` ENUM('IN_PROGRESS', 'SUBMITTED', 'MARKED') NOT NULL DEFAULT 'IN_PROGRESS',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ExamAnswer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `attemptId` INTEGER NOT NULL,
    `questionId` INTEGER NOT NULL,
    `choiceId` INTEGER NULL,
    `isCorrect` BOOLEAN NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Exam` ADD CONSTRAINT `Exam_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Exam` ADD CONSTRAINT `Exam_lessonId_fkey` FOREIGN KEY (`lessonId`) REFERENCES `Lesson`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExamQuestions` ADD CONSTRAINT `ExamQuestions_examId_fkey` FOREIGN KEY (`examId`) REFERENCES `Exam`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExamQuestions` ADD CONSTRAINT `ExamQuestions_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `Questions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExamAttempt` ADD CONSTRAINT `ExamAttempt_examId_fkey` FOREIGN KEY (`examId`) REFERENCES `Exam`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExamAttempt` ADD CONSTRAINT `ExamAttempt_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExamAnswer` ADD CONSTRAINT `ExamAnswer_attemptId_fkey` FOREIGN KEY (`attemptId`) REFERENCES `ExamAttempt`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExamAnswer` ADD CONSTRAINT `ExamAnswer_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `Questions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExamAnswer` ADD CONSTRAINT `ExamAnswer_choiceId_fkey` FOREIGN KEY (`choiceId`) REFERENCES `QuestionChoices`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
