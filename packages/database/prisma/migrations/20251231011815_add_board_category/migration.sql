/*
  Warnings:

  - Added the required column `categoryId` to the `Board` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "fumimi_channel"."Board" ADD COLUMN     "categoryId" UUID NOT NULL,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "fumimi_channel"."Post" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- CreateTable
CREATE TABLE "fumimi_channel"."BoardCategory" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "BoardCategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "BoardCategory_sortOrder_idx" ON "fumimi_channel"."BoardCategory"("sortOrder");

-- CreateIndex
CREATE INDEX "Board_categoryId_idx" ON "fumimi_channel"."Board"("categoryId");

-- AddForeignKey
ALTER TABLE "fumimi_channel"."Board" ADD CONSTRAINT "Board_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "fumimi_channel"."BoardCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
