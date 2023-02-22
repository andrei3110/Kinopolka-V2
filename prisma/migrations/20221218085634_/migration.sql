-- AlterTable
ALTER TABLE `bascet` MODIFY `name` VARCHAR(255) NULL,
    MODIFY `image` VARCHAR(255) NULL,
    MODIFY `genre` VARCHAR(255) NULL,
    MODIFY `country` VARCHAR(255) NULL,
    MODIFY `age` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `comments` MODIFY `text` VARCHAR(255) NULL,
    MODIFY `user__name` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `items` MODIFY `image` VARCHAR(255) NULL,
    MODIFY `country` VARCHAR(255) NULL,
    MODIFY `description` VARCHAR(255) NULL,
    MODIFY `genre` VARCHAR(255) NULL,
    MODIFY `name` VARCHAR(255) NULL,
    MODIFY `type` VARCHAR(255) NULL,
    MODIFY `actor` VARCHAR(255) NULL,
    MODIFY `operator` VARCHAR(255) NULL,
    MODIFY `regicer` VARCHAR(255) NULL,
    MODIFY `screenwriter` VARCHAR(255) NULL,
    MODIFY `producer` VARCHAR(255) NULL,
    MODIFY `age` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `rating` MODIFY `name` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `name` VARCHAR(255) NULL,
    MODIFY `password` VARCHAR(255) NULL;
