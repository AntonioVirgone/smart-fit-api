-- CreateEnum
CREATE TYPE "CustomerStatus" AS ENUM ('pending', 'active', 'disabled');

-- CreateEnum
CREATE TYPE "WorkoutType" AS ENUM ('heating', 'series');

-- CreateEnum
CREATE TYPE "WorkoutIntensity" AS ENUM ('light', 'moderate', 'intense');

-- CreateTable
CREATE TABLE "WorkoutHistory" (
    "id" SERIAL NOT NULL,
    "customerId" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "repetitions" INTEGER NOT NULL,
    "weight" DECIMAL(5,2) NOT NULL,
    "notes" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "intensity" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkoutHistory_pkey" PRIMARY KEY ("id")
);
