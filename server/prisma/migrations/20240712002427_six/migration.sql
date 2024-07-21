/*
  Warnings:

  - You are about to drop the column `totalVlue` on the `sale` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `sale` DROP COLUMN `totalVlue`,
    ADD COLUMN `totalValue` DOUBLE NOT NULL DEFAULT 0.0;
