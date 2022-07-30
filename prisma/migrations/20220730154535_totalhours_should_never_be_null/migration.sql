/*
  Warnings:

  - You are about to alter the column `totalHours` on the `User` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - Made the column `totalHours` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "totalHours" SET NOT NULL,
ALTER COLUMN "totalHours" SET DEFAULT 0,
ALTER COLUMN "totalHours" SET DATA TYPE INTEGER;
