/*
  Warnings:

  - Added the required column `answerMode` to the `ExamAnswer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `examanswer` ADD COLUMN `answerMode` ENUM('CHOICE', 'TEXT', 'JSON', 'NUMERIC') NOT NULL,
    ADD COLUMN `score` INTEGER NULL,
    ADD COLUMN `textAnswer` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `photo` VARCHAR(191) NULL;
