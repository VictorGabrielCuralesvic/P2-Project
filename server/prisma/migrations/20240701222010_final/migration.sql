/*
  Warnings:

  - You are about to drop the column `otherCosts` on the `pricecalculation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `pricecalculation` DROP COLUMN `otherCosts`,
    ADD COLUMN `indirectCosts` DOUBLE NOT NULL DEFAULT 0.0,
    ADD COLUMN `laborCosts` DOUBLE NOT NULL DEFAULT 0.0,
    ADD COLUMN `packagingCosts` DOUBLE NULL,
    ADD COLUMN `totalCost` DOUBLE NOT NULL DEFAULT 0.0;
