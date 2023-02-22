/*
  Warnings:

  - You are about to alter the column `type` on the `items` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Int`.

*/
-- AlterTable
ALTER TABLE `bascet` ADD COLUMN `Username` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `items` MODIFY `type` INTEGER NULL;
