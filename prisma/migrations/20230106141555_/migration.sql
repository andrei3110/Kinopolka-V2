/*
  Warnings:

  - You are about to drop the column `year` on the `years` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `years` DROP COLUMN `year`,
    ADD COLUMN `date` INTEGER NULL;
