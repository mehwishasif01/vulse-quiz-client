/*
  Warnings:

  - You are about to drop the column `content` on the `Question` table. All the data in the column will be lost.
  - Added the required column `title` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Quiz` DROP FOREIGN KEY `Quiz_userId_fkey`;

-- AlterTable
ALTER TABLE `Question` DROP COLUMN `content`,
    ADD COLUMN `title` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Quiz` MODIFY `userId` INTEGER NULL;
