/*
  Warnings:

  - You are about to drop the column `star` on the `bascet` table. All the data in the column will be lost.
  - Added the required column `age` to the `bascet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `bascet` DROP COLUMN `star`,
    ADD COLUMN `age` VARCHAR(255) NOT NULL;

-- CreateTable
CREATE TABLE `rating` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `star` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
