-- AlterTable
ALTER TABLE `examanswer` ADD COLUMN `voided` INTEGER NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `examattempt` ADD COLUMN `voided` INTEGER NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `examquestions` ADD COLUMN `voided` INTEGER NULL DEFAULT 0;
