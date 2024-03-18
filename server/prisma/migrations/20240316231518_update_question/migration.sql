/*
  Warnings:

  - Added the required column `score` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Quiz_userId_fkey` ON `Quiz`;

-- AlterTable
ALTER TABLE `Question` ADD COLUMN `score` INTEGER NOT NULL;
