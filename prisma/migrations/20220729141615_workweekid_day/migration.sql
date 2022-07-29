/*
  Warnings:

  - A unique constraint covering the columns `[workWeekId,day]` on the table `WorkDay` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "WorkDay" ADD COLUMN     "day" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "WorkDay_workWeekId_day_key" ON "WorkDay"("workWeekId", "day");
