/*
  Warnings:

  - You are about to drop the column `venueId` on the `Address` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Venue_addressId_key";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "venueId";
