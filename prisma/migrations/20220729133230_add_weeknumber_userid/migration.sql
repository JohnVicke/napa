/*
  Warnings:

  - A unique constraint covering the columns `[weekNumber,userId]` on the table `WorkWeek` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "WorkWeek_weekNumber_userId_key" ON "WorkWeek"("weekNumber", "userId");
