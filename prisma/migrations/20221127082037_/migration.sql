/*
  Warnings:

  - A unique constraint covering the columns `[type]` on the table `items` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `items_type_key` ON `items`(`type`);
