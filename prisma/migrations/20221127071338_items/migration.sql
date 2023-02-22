/*
  Warnings:

  - You are about to drop the column `title` on the `items` table. All the data in the column will be lost.
  - Added the required column `country` to the `items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `genre` to the `items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `star` to the `items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `items` DROP COLUMN `title`,
    ADD COLUMN `country` VARCHAR(255) NOT NULL,
    ADD COLUMN `description` VARCHAR(255) NOT NULL,
    ADD COLUMN `genre` VARCHAR(255) NOT NULL,
    ADD COLUMN `name` VARCHAR(255) NOT NULL,
    ADD COLUMN `star` VARCHAR(255) NOT NULL,
    ADD COLUMN `type` VARCHAR(255) NOT NULL;
