-- CreateTable
CREATE TABLE `Enrollments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `eventId` INTEGER NOT NULL,
    `price` INTEGER NULL DEFAULT 1,
    `status` ENUM('IN_PROGRESS', 'ON_HOLD', 'PAID', 'PENDING_PAYMENTS', 'COMPELETED') NOT NULL,
    `voided` INTEGER NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Payments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `enrollmentId` INTEGER NOT NULL,
    `orderNumber` VARCHAR(191) NULL,
    `payerNumber` VARCHAR(191) NULL,
    `amount` VARCHAR(191) NULL,
    `currency` VARCHAR(191) NULL,
    `modeOfPayment` ENUM('Paypal', 'Visa', 'Mpesa') NOT NULL,
    `status` ENUM('IN_PROGRESS', 'ON_HOLD', 'PAID', 'PENDING_PAYMENTS', 'COMPELETED') NOT NULL,
    `voided` INTEGER NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Enrollments` ADD CONSTRAINT `Enrollments_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Enrollments` ADD CONSTRAINT `Enrollments_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payments` ADD CONSTRAINT `Payments_enrollmentId_fkey` FOREIGN KEY (`enrollmentId`) REFERENCES `Enrollments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
