/*
  Warnings:

  - Added the required column `ipAddress` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "fumimi_channel"."Post" ADD COLUMN     "ipAddress" VARCHAR(45) NOT NULL,
ADD COLUMN     "name" VARCHAR(255);
