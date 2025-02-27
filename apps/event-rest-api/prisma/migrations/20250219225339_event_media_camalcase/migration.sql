/*
  Warnings:

  - You are about to drop the column `CoverAudio` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `CoverImage` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `CoverVideo` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `Images` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `IsCancelled` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `IsFullDay` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `IsRecurring` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `Recurrence` on the `Event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "CoverAudio",
DROP COLUMN "CoverImage",
DROP COLUMN "CoverVideo",
DROP COLUMN "Images",
DROP COLUMN "IsCancelled",
DROP COLUMN "IsFullDay",
DROP COLUMN "IsRecurring",
DROP COLUMN "Recurrence",
ADD COLUMN     "coverAudio" JSONB,
ADD COLUMN     "coverImage" JSONB,
ADD COLUMN     "coverVideo" JSONB,
ADD COLUMN     "images" JSONB,
ADD COLUMN     "isCancelled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isFullDay" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isRecurring" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "recurrence" TEXT DEFAULT 'DAILY';
