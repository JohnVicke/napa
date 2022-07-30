/*
  Warnings:

  - Made the column `workWeekId` on table `WorkDay` required. This step will fail if there are existing NULL values in that column.
  - Made the column `day` on table `WorkDay` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "WorkDay" ALTER COLUMN "workWeekId" SET NOT NULL,
ALTER COLUMN "day" SET NOT NULL;
