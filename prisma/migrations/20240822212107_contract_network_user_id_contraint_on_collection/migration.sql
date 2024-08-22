/*
  Warnings:

  - A unique constraint covering the columns `[contract,network,userId]` on the table `Collection` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Collection_contract_network_userId_key" ON "Collection"("contract", "network", "userId");
