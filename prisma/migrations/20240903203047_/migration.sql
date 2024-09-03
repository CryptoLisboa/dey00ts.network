-- DropForeignKey
ALTER TABLE "UserExperience" DROP CONSTRAINT "UserExperience_experienceId_fkey";

-- DropForeignKey
ALTER TABLE "UserExperience" DROP CONSTRAINT "UserExperience_userId_fkey";

-- AddForeignKey
ALTER TABLE "UserExperience" ADD CONSTRAINT "UserExperience_experienceId_fkey" FOREIGN KEY ("experienceId") REFERENCES "Experience"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserExperience" ADD CONSTRAINT "UserExperience_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
