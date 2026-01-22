/*
  Warnings:

  - You are about to drop the column `companyId` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `createdBy` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `uuid` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `voided` on the `user` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `user_uuid_key` ON `user`;

-- DropIndex
DROP INDEX `username_key` ON `user`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `companyId`,
    DROP COLUMN `createdAt`,
    DROP COLUMN `createdBy`,
    DROP COLUMN `updatedAt`,
    DROP COLUMN `username`,
    DROP COLUMN `uuid`,
    DROP COLUMN `voided`;
