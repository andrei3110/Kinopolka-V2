/*
  Warnings:

  - You are about to drop the `aboutfilm` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `actor` to the `items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `operator` to the `items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `porducer` to the `items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `regicer` to the `items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `screenwriter` to the `items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `items` ADD COLUMN `actor` VARCHAR(255) NOT NULL,
    ADD COLUMN `operator` VARCHAR(255) NOT NULL,
    ADD COLUMN `porducer` VARCHAR(255) NOT NULL,
    ADD COLUMN `regicer` VARCHAR(255) NOT NULL,
    ADD COLUMN `screenwriter` VARCHAR(255) NOT NULL;

-- DropTable
DROP TABLE `aboutfilm`;
