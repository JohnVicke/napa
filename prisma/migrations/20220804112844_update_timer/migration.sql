/*
  Warnings:

  - You are about to drop the column `workWeekId` on the `Timer` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Timer_workWeekId_key";

-- AlterTable
ALTER TABLE "Timer" DROP COLUMN "workWeekId";
