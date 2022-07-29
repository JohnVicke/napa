/*
  Warnings:

  - You are about to drop the column `hours` on the `WorkDayTimeEntry` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "WorkDayTimeEntry" DROP COLUMN "hours",
ADD COLUMN     "endTime" TIMESTAMP(3),
ADD COLUMN     "startTime" TIMESTAMP(3),
ADD COLUMN     "timerOn" BOOLEAN NOT NULL DEFAULT true;
