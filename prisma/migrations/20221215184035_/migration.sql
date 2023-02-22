/*
  Warnings:

  - Made the column `item__id` on table `rating` required. This step will fail if there are existing NULL values in that column.
  - Made the column `rate` on table `rating` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `rating` MODIFY `item__id` INTEGER NOT NULL,
    MODIFY `rate` INTEGER NOT NULL;
