-- AlterTable
ALTER TABLE "User" ADD COLUMN     "totalHours" DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "WorkDayTimeEntry" (
    "id" SERIAL NOT NULL,
    "hours" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "workDayId" INTEGER,

    CONSTRAINT "WorkDayTimeEntry_pkey" PRIMARY KEY ("id")
);
