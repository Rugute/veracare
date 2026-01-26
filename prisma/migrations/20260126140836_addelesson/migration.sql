-- CreateTable
CREATE TABLE `Lesson` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `courseId` INTEGER NULL,
    `lessonName` VARCHAR(191) NULL,
    `lessonVideo` VARCHAR(191) NULL,
    `lessonDuration` VARCHAR(191) NULL,
    `lessonOrder` DECIMAL(65, 30) NOT NULL,
    `lessonDescription` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `lessonDocument` VARCHAR(191) NULL,
    `photo` VARCHAR(191) NULL,
    `photoPath` VARCHAR(191) NULL,
    `voided` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Lesson` ADD CONSTRAINT `Lesson_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
