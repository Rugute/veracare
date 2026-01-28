/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `QuestionType` will be added. If there are existing duplicate values, this will fail.
  - Made the column `name` on table `questiontype` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `questiontype` MODIFY `name` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `QuestionChoices` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `questionId` INTEGER NULL,
    `choice` VARCHAR(191) NULL,
    `is_correct` INTEGER NULL,
    `voided` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `QuestionType_name_key` ON `QuestionType`(`name`);

-- AddForeignKey
ALTER TABLE `QuestionChoices` ADD CONSTRAINT `QuestionChoices_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `Questions`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
