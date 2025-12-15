/*
  Warnings:

  - You are about to drop the `WorkoutHistory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "WorkoutHistory";

-- CreateTable
CREATE TABLE "HistoryWorkout" (
    "id" SERIAL NOT NULL,
    "customerId" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "repetitions" INTEGER NOT NULL,
    "weight" DECIMAL(5,2) NOT NULL,
    "notes" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'series',
    "intensity" TEXT NOT NULL DEFAULT 'light',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HistoryWorkout_pkey" PRIMARY KEY ("id")
);
