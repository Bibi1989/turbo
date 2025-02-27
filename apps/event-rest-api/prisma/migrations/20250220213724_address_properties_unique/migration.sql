/*
  Warnings:

  - A unique constraint covering the columns `[streetName]` on the table `Address` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[houseNumber]` on the table `Address` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[city]` on the table `Address` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[zipCode]` on the table `Address` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[country]` on the table `Address` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Address_streetName_key" ON "Address"("streetName");

-- CreateIndex
CREATE UNIQUE INDEX "Address_houseNumber_key" ON "Address"("houseNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Address_city_key" ON "Address"("city");

-- CreateIndex
CREATE UNIQUE INDEX "Address_zipCode_key" ON "Address"("zipCode");

-- CreateIndex
CREATE UNIQUE INDEX "Address_country_key" ON "Address"("country");
