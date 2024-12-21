-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('CPF', 'CNPJ');

-- CreateTable
CREATE TABLE "RuralProducer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "documentType" "DocumentType" NOT NULL,
    "document" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "RuralProducer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RuralProducer_document_key" ON "RuralProducer"("document");

-- CreateIndex
CREATE INDEX "RuralProducer_name_idx" ON "RuralProducer"("name");

-- CreateIndex
CREATE INDEX "RuralProducer_document_idx" ON "RuralProducer"("document");

-- AddForeignKey
ALTER TABLE "RuralProducer" ADD CONSTRAINT "RuralProducer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
