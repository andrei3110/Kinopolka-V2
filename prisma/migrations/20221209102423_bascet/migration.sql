-- CreateTable
CREATE TABLE `bascet` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `image` VARCHAR(255) NOT NULL,
    `genre` VARCHAR(255) NOT NULL,
    `country` VARCHAR(255) NOT NULL,
    `type` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `star` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
