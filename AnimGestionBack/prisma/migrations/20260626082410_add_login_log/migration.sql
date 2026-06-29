/*
  Warnings:

  - The primary key for the `_categorymaterialtomaterial` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `my_row_id` on the `_categorymaterialtomaterial` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `_categorymaterialtomaterial` DROP PRIMARY KEY,
    DROP COLUMN `my_row_id`;

-- CreateTable
CREATE TABLE `AuthLog` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `userId` VARCHAR(191) NULL,
    `status` ENUM('SUCCESS', 'FAILED') NOT NULL,
    `reason` VARCHAR(191) NULL,
    `ipAddress` VARCHAR(191) NULL,
    `userAgent` VARCHAR(191) NULL,
    `route` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AuthLog` ADD CONSTRAINT `AuthLog_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
