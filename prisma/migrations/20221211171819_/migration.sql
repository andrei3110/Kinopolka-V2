/*
  Warnings:

  - You are about to drop the column `star` on the `items` table. All the data in the column will be lost.
  - Added the required column `age` to the `items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `items` DROP COLUMN `star`,
    ADD COLUMN `age` VARCHAR(255) NOT NULL;
