/*
  Warnings:

  - You are about to drop the column `moves__id` on the `comments` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `comments` DROP COLUMN `moves__id`,
    ADD COLUMN `move__id` INTEGER NULL;
