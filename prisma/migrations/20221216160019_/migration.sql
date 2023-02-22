/*
  Warnings:

  - You are about to drop the column `name` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `comments` table. All the data in the column will be lost.
  - Added the required column `item__name` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `text` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user__name` to the `comments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `comments` DROP COLUMN `name`,
    DROP COLUMN `title`,
    ADD COLUMN `item__name` VARCHAR(255) NOT NULL,
    ADD COLUMN `text` VARCHAR(255) NOT NULL,
    ADD COLUMN `user__name` VARCHAR(255) NOT NULL;
