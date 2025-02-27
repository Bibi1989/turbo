/*
  Warnings:

  - Added the required column `CoverAudio` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CoverImage` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CoverVideo` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Images` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "CoverAudio" JSONB NOT NULL,
ADD COLUMN     "CoverImage" JSONB NOT NULL,
ADD COLUMN     "CoverVideo" JSONB NOT NULL,
ADD COLUMN     "Images" JSONB NOT NULL,
ADD COLUMN     "IsCancelled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "IsFullDay" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "IsRecurring" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "Recurrence" TEXT DEFAULT 'DAILY',
ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "startDate" TIMESTAMP(3);
