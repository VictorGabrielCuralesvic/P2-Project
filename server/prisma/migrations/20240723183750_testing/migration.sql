/*
  Warnings:

  - You are about to drop the column `category` on the `transaction` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `transaction` DROP COLUMN `category`,
    DROP COLUMN `notes`;
