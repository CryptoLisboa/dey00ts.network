/*
  Warnings:

  - You are about to drop the column `description` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `latitude` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `Location` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Location" DROP COLUMN "description",
DROP COLUMN "latitude",
DROP COLUMN "longitude",
ADD COLUMN     "cityId" INTEGER,
ADD COLUMN     "countryId" INTEGER,
ADD COLUMN     "externalCityId" INTEGER,
ADD COLUMN     "externalCountryId" INTEGER,
ADD COLUMN     "externalStateId" INTEGER,
ADD COLUMN     "stateId" INTEGER,
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "value" DROP NOT NULL;

-- CreateTable
CREATE TABLE "CountryApi" (
    "id" SERIAL NOT NULL,
    "externalCountryId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "iso3" TEXT NOT NULL,
    "iso2" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "externalRegionId" INTEGER NOT NULL,
    "subregion" TEXT NOT NULL,
    "externalSubRegionId" INTEGER NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "emoji" TEXT NOT NULL,

    CONSTRAINT "CountryApi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StateApi" (
    "id" SERIAL NOT NULL,
    "externalStateId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "iso2" TEXT NOT NULL,
    "stateCode" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "countryId" INTEGER NOT NULL,

    CONSTRAINT "StateApi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CityApi" (
    "id" SERIAL NOT NULL,
    "externalCityId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "stateId" INTEGER NOT NULL,
    "countryId" INTEGER NOT NULL,

    CONSTRAINT "CityApi_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CountryApi_externalCountryId_key" ON "CountryApi"("externalCountryId");

-- CreateIndex
CREATE INDEX "idx_country_external_id" ON "CountryApi"("externalCountryId");

-- CreateIndex
CREATE UNIQUE INDEX "StateApi_externalStateId_key" ON "StateApi"("externalStateId");

-- CreateIndex
CREATE INDEX "idx_state_external_id" ON "StateApi"("externalStateId");

-- CreateIndex
CREATE UNIQUE INDEX "CityApi_externalCityId_key" ON "CityApi"("externalCityId");

-- CreateIndex
CREATE INDEX "idx_city_external_id" ON "CityApi"("externalCityId");

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "CountryApi"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "StateApi"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "CityApi"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StateApi" ADD CONSTRAINT "StateApi_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "CountryApi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CityApi" ADD CONSTRAINT "CityApi_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "StateApi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CityApi" ADD CONSTRAINT "CityApi_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "CountryApi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
