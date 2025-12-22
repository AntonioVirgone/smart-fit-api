/*
  Warnings:

  - The primary key for the `HistoryWorkout` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "HistoryWorkout" DROP CONSTRAINT "HistoryWorkout_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "HistoryWorkout_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "HistoryWorkout_id_seq";
