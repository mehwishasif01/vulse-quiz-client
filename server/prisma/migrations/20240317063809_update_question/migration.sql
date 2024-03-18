-- DropForeignKey
ALTER TABLE `Question` DROP FOREIGN KEY `Question_quizId_fkey`;

-- AlterTable
ALTER TABLE `Question` MODIFY `quizId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Question` ADD CONSTRAINT `Question_quizId_fkey` FOREIGN KEY (`quizId`) REFERENCES `Quiz`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
