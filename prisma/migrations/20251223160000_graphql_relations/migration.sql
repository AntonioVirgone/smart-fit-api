-- AlterTable
ALTER TABLE "User" ALTER COLUMN "customerId" DROP NOT NULL,
ALTER COLUMN "customerId" DROP DEFAULT;

-- AlterTable
ALTER TABLE "CustomerProfile" DROP COLUMN "customerCode",
ADD COLUMN     "customerId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "History_customerId_idx" ON "History"("customerId");

-- CreateIndex
CREATE INDEX "HistoryWorkout_customerId_idx" ON "HistoryWorkout"("customerId");

-- CreateIndex
CREATE INDEX "HistoryWorkout_exerciseId_idx" ON "HistoryWorkout"("exerciseId");

-- CreateIndex
CREATE UNIQUE INDEX "CustomerProfile_customerId_key" ON "CustomerProfile"("customerId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoryWorkout" ADD CONSTRAINT "HistoryWorkout_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoryWorkout" ADD CONSTRAINT "HistoryWorkout_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerProfile" ADD CONSTRAINT "CustomerProfile_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

