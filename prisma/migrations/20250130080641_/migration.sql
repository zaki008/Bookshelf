/*
  Warnings:

  - The primary key for the `books` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `books` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The values [Technology,Fantasy,Mystery,Romance,Horror,Adventure,Philosophy] on the enum `books_category` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `books` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `category` ENUM('technology', 'fantasy', 'mystery', 'romance', 'horror', 'adventure', 'philosophy') NOT NULL,
    ADD PRIMARY KEY (`id`);
