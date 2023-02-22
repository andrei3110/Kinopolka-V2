-- CreateTable
CREATE TABLE `aboutFilm` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `porducer` VARCHAR(255) NOT NULL,
    `operator` VARCHAR(255) NOT NULL,
    `screenwriter` VARCHAR(255) NOT NULL,
    `regicer` VARCHAR(255) NOT NULL,
    `actor` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
