/*
  Warnings:

  - The `status` column on the `Customer` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `type` column on the `WorkoutHistory` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `intensity` column on the `WorkoutHistory` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "status",
ADD COLUMN     "status" "CustomerStatus" NOT NULL DEFAULT 'pending';

-- AlterTable
ALTER TABLE "WorkoutHistory" DROP COLUMN "type",
ADD COLUMN     "type" "WorkoutType" NOT NULL DEFAULT 'series',
DROP COLUMN "intensity",
ADD COLUMN     "intensity" "WorkoutIntensity" NOT NULL DEFAULT 'light';
