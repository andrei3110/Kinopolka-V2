/*
  Warnings:

  - You are about to drop the column `move__id` on the `comments` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `comments` DROP COLUMN `move__id`,
    ADD COLUMN `moves__id` INTEGER NULL;
