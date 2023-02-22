/*
  Warnings:

  - You are about to alter the column `name` on the `rating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Int`.

*/
-- AlterTable
ALTER TABLE `rating` MODIFY `name` INTEGER NOT NULL;
