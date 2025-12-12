/*
  Warnings:

  - The `type` column on the `WorkoutHistory` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `intensity` column on the `WorkoutHistory` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "WorkoutHistory" DROP COLUMN "type",
ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'series',
DROP COLUMN "intensity",
ADD COLUMN     "intensity" TEXT NOT NULL DEFAULT 'light';
