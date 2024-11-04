/*
  Warnings:

  - You are about to drop the column `createdAt` on the `financialtip` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `financialtip` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `passwordreset` table. All the data in the column will be lost.
  - You are about to drop the column `expiresAt` on the `passwordreset` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `report` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `report` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `transaction` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `financialtip` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `passwordreset` DROP COLUMN `createdAt`,
    DROP COLUMN `expiresAt`;

-- AlterTable
ALTER TABLE `report` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `transaction` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;
