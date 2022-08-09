/*
  Warnings:

  - You are about to drop the column `timerOn` on the `WorkDayTimeEntry` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "WorkDayTimeEntry" DROP COLUMN "timerOn";

-- CreateTable
CREATE TABLE "Timer" (
    "id" SERIAL NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3),
    "workWeekId" INTEGER NOT NULL,

    CONSTRAINT "Timer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Timer_workWeekId_key" ON "Timer"("workWeekId");
