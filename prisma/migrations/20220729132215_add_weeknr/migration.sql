/*
  Warnings:

  - Added the required column `weekNumber` to the `WorkWeek` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WorkWeek" ADD COLUMN     "weekNumber" INTEGER NOT NULL;
