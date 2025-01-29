/*
  Warnings:

  - You are about to alter the column `status` on the `books` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `Enum(EnumId(1))`.

*/
-- AlterTable
ALTER TABLE `books` MODIFY `status` ENUM('completed', 'read', 'unread') NOT NULL;
