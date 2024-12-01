/*
  Warnings:

  - You are about to drop the column `createdAt` on the `pricecalculation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `pricecalculation` DROP COLUMN `createdAt`,
    ADD COLUMN `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
