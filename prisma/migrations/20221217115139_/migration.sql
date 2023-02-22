/*
  Warnings:

  - You are about to drop the column `item__name` on the `comments` table. All the data in the column will be lost.
  - Added the required column `move__id` to the `comments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `comments` DROP COLUMN `item__name`,
    ADD COLUMN `move__id` VARCHAR(255) NOT NULL;
