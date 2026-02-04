/*
  Warnings:

  - Made the column `description` on table `category` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `course` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `event` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `exam` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `questiontype` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `category` MODIFY `description` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `course` MODIFY `description` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `event` MODIFY `description` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `exam` MODIFY `description` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `questiontype` MODIFY `description` TEXT NOT NULL;
