-- CreateTable
CREATE TABLE "UrlVisit" (
    "id" TEXT NOT NULL,
    "visitedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "urlId" TEXT NOT NULL,

    CONSTRAINT "UrlVisit_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UrlVisit" ADD CONSTRAINT "UrlVisit_urlId_fkey" FOREIGN KEY ("urlId") REFERENCES "Url"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
