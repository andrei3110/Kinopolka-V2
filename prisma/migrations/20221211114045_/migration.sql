/*
  Warnings:

  - You are about to drop the column `porducer` on the `items` table. All the data in the column will be lost.
  - Added the required column `producer` to the `items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `items` DROP COLUMN `porducer`,
    ADD COLUMN `producer` VARCHAR(255) NOT NULL;
