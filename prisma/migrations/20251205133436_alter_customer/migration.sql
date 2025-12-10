/*
  Warnings:

  - You are about to drop the column `email` on the `CustomerProfile` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `CustomerProfile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "email" TEXT,
ADD COLUMN     "phone" TEXT;

-- AlterTable
ALTER TABLE "CustomerProfile" DROP COLUMN "email",
DROP COLUMN "phone";
