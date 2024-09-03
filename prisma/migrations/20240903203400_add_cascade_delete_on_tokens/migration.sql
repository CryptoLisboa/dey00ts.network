-- DropForeignKey
ALTER TABLE "Token" DROP CONSTRAINT "Token_collectionId_fkey";

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
