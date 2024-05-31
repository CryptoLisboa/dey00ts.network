/*
  Warnings:

  - You are about to drop the column `userId` on the `Language` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Location` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Language" DROP CONSTRAINT "Language_userId_fkey";

-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_userId_fkey";

-- AlterTable
ALTER TABLE "Language" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "Location" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "locationId" INTEGER;

-- CreateTable
CREATE TABLE "_UserLanguages" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserLanguages_AB_unique" ON "_UserLanguages"("A", "B");

-- CreateIndex
CREATE INDEX "_UserLanguages_B_index" ON "_UserLanguages"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserLanguages" ADD CONSTRAINT "_UserLanguages_A_fkey" FOREIGN KEY ("A") REFERENCES "Language"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserLanguages" ADD CONSTRAINT "_UserLanguages_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
