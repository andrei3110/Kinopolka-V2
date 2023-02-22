/*
  Warnings:

  - You are about to drop the `suoport` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `suoport`;

-- CreateTable
CREATE TABLE `support` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NULL,
    `text` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
