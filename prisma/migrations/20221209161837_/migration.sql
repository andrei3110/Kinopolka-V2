/*
  Warnings:

  - You are about to drop the column `description` on the `bascet` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `bascet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `bascet` DROP COLUMN `description`,
    DROP COLUMN `type`;
