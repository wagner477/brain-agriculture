/*
  Warnings:

  - You are about to drop the column `documentType` on the `RuralProducer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "RuralProducer" DROP COLUMN "documentType";

-- DropEnum
DROP TYPE "DocumentType";
