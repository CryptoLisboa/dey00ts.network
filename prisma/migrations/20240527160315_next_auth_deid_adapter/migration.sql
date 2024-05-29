/*
  Warnings:

  - A unique constraint covering the columns `[externalId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[address]` on the table `Wallet` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `externalId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `network` to the `Wallet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "externalId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Wallet" ADD COLUMN     "network" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Socials" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "telegramId" TEXT,
    "telegramUsername" TEXT,
    "discordId" TEXT,
    "discordUsername" TEXT,
    "twitterId" TEXT,
    "twitterHandle" TEXT,
    "twitterUsername" TEXT,

    CONSTRAINT "Socials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Token" (
    "id" SERIAL NOT NULL,
    "wallet" TEXT NOT NULL,
    "tokenId" INTEGER NOT NULL,
    "staked" BOOLEAN NOT NULL,
    "collectionId" INTEGER NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Collection" (
    "id" SERIAL NOT NULL,
    "network" TEXT NOT NULL,
    "contract" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dust" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "preciseAmount" TEXT NOT NULL,
    "decimals" INTEGER NOT NULL,

    CONSTRAINT "Dust_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Socials_userId_key" ON "Socials"("userId");

-- CreateIndex
CREATE INDEX "idx_socials_user" ON "Socials"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Dust_userId_key" ON "Dust"("userId");

-- CreateIndex
CREATE INDEX "idx_dust_user" ON "Dust"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_externalId_key" ON "User"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_address_key" ON "Wallet"("address");

-- CreateIndex
CREATE INDEX "idx_wallets_user" ON "Wallet"("userId");

-- AddForeignKey
ALTER TABLE "Socials" ADD CONSTRAINT "Socials_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dust" ADD CONSTRAINT "Dust_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
