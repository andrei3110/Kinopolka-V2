/*
  Warnings:

  - You are about to alter the column `age` on the `bascet` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Int`.

*/
-- AlterTable
ALTER TABLE `bascet` MODIFY `age` INTEGER NOT NULL;
