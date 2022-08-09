/*
  Warnings:

  - You are about to drop the column `endTime` on the `Timer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Timer" DROP COLUMN "endTime",
ADD COLUMN     "on" BOOLEAN DEFAULT true;
