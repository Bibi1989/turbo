/*
  Warnings:

  - Added the required column `zipCode` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "zipCode" TEXT NOT NULL,
ALTER COLUMN "address" DROP NOT NULL,
ALTER COLUMN "region" DROP NOT NULL,
ALTER COLUMN "venueId" DROP NOT NULL;
