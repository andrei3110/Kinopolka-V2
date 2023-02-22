/*
  Warnings:

  - You are about to drop the column `country` on the `items` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `items` table. All the data in the column will be lost.
  - You are about to drop the column `genre` on the `items` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `items` table. All the data in the column will be lost.
  - You are about to drop the column `star` on the `items` table. All the data in the column will be lost.
  - Added the required column `title` to the `items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `items` DROP COLUMN `country`,
    DROP COLUMN `description`,
    DROP COLUMN `genre`,
    DROP COLUMN `name`,
    DROP COLUMN `star`,
    ADD COLUMN `title` VARCHAR(255) NOT NULL;
