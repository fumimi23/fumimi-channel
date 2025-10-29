-- CreateEnum
CREATE TYPE "fumimi_channel"."ThreadStatus" AS ENUM ('OPEN', 'CLOSED', 'ARCHIVED');

-- CreateTable
CREATE TABLE "fumimi_channel"."Board" (
    "key" VARCHAR(64) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "isReadOnly" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Board_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "fumimi_channel"."Thread" (
    "id" UUID NOT NULL,
    "boardKey" VARCHAR(64) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "status" "fumimi_channel"."ThreadStatus" NOT NULL DEFAULT 'OPEN',
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Thread_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fumimi_channel"."Post" (
    "id" UUID NOT NULL,
    "threadId" UUID NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Thread_boardKey_updatedAt_idx" ON "fumimi_channel"."Thread"("boardKey", "updatedAt");

-- CreateIndex
CREATE INDEX "Thread_status_idx" ON "fumimi_channel"."Thread"("status");

-- CreateIndex
CREATE INDEX "Post_threadId_createdAt_idx" ON "fumimi_channel"."Post"("threadId", "createdAt");

-- AddForeignKey
ALTER TABLE "fumimi_channel"."Thread" ADD CONSTRAINT "Thread_boardKey_fkey" FOREIGN KEY ("boardKey") REFERENCES "fumimi_channel"."Board"("key") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fumimi_channel"."Post" ADD CONSTRAINT "Post_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "fumimi_channel"."Thread"("id") ON DELETE CASCADE ON UPDATE CASCADE;
