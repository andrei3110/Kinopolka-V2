-- DropIndex
DROP INDEX `items_type_key` ON `items`;

-- AlterTable
ALTER TABLE `items` MODIFY `type` VARCHAR(255) NOT NULL;
