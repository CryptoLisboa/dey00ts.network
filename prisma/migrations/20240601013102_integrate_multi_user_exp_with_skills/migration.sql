/*
  Warnings:

  - You are about to drop the column `userId` on the `Experience` table. All the data in the column will be lost.
  - Added the required column `skillId` to the `Experience` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Experience` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Experience" DROP CONSTRAINT "Experience_userId_fkey";

-- AlterTable
ALTER TABLE "Experience" DROP COLUMN "userId",
ADD COLUMN     "current" BOOLEAN,
ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "skillId" INTEGER NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "UserExperience" (
    "userId" TEXT NOT NULL,
    "experienceId" INTEGER NOT NULL,

    CONSTRAINT "UserExperience_pkey" PRIMARY KEY ("userId","experienceId")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserExperience_userId_key" ON "UserExperience"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserExperience_experienceId_key" ON "UserExperience"("experienceId");

-- AddForeignKey
ALTER TABLE "Experience" ADD CONSTRAINT "Experience_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserExperience" ADD CONSTRAINT "UserExperience_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserExperience" ADD CONSTRAINT "UserExperience_experienceId_fkey" FOREIGN KEY ("experienceId") REFERENCES "Experience"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
