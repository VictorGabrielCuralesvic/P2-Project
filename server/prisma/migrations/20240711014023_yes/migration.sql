/*
  Warnings:

  - You are about to drop the column `createdAt` on the `pricecalculation` table. All the data in the column will be lost.
  - You are about to drop the column `manualPrice` on the `pricecalculation` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `pricecalculation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `pricecalculation` DROP COLUMN `createdAt`,
    DROP COLUMN `manualPrice`,
    DROP COLUMN `updatedAt`;

-- CreateTable
CREATE TABLE `Ingredient` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `quantity` DOUBLE NOT NULL,
    `price` DOUBLE NOT NULL,
    `usedQuantity` DOUBLE NOT NULL,
    `priceCalculationId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Ingredient` ADD CONSTRAINT `Ingredient_priceCalculationId_fkey` FOREIGN KEY (`priceCalculationId`) REFERENCES `PriceCalculation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
