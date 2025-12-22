/*
  Warnings:

  - You are about to drop the column `recovery` on the `PlanExercise` table. All the data in the column will be lost.
  - You are about to drop the column `repetitions` on the `PlanExercise` table. All the data in the column will be lost.
  - You are about to drop the column `sets` on the `PlanExercise` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PlanExercise" DROP COLUMN "recovery",
DROP COLUMN "repetitions",
DROP COLUMN "sets";
