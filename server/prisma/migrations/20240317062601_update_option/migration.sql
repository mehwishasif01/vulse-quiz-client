-- DropForeignKey
ALTER TABLE `Option` DROP FOREIGN KEY `Option_questionId_fkey`;

-- AlterTable
ALTER TABLE `Option` MODIFY `questionId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Option` ADD CONSTRAINT `Option_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `Question`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
