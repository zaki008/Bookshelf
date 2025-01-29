/*
  Warnings:

  - You are about to alter the column `category` on the `books` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `Enum(EnumId(0))`.
  - Added the required column `username` to the `books` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `books` ADD COLUMN `username` VARCHAR(191) NOT NULL,
    MODIFY `category` ENUM('Technology', 'Fantasy', 'Mystery', 'Romance', 'Horror', 'Adventure', 'Philosophy') NOT NULL;

-- AddForeignKey
ALTER TABLE `books` ADD CONSTRAINT `books_username_fkey` FOREIGN KEY (`username`) REFERENCES `users`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;
