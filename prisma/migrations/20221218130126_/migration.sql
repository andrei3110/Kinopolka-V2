/*
  Warnings:

  - You are about to alter the column `age` on the `items` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.

*/
-- AlterTable
ALTER TABLE `items` MODIFY `age` FLOAT NULL;
