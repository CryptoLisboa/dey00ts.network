/*
  Warnings:

  - Added the required column `value` to the `Location` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "value" TEXT NOT NULL;
