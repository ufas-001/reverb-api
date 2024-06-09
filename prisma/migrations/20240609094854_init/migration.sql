/*
  Warnings:

  - Added the required column `apiKey` to the `ArticleLink` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ArticleLink" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "header" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    "apiKey" TEXT NOT NULL,
    CONSTRAINT "ArticleLink_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ArticleLink_apiKey_fkey" FOREIGN KEY ("apiKey") REFERENCES "ApiKey" ("key") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ArticleLink" ("createdAt", "header", "id", "link", "updatedAt", "userId") SELECT "createdAt", "header", "id", "link", "updatedAt", "userId" FROM "ArticleLink";
DROP TABLE "ArticleLink";
ALTER TABLE "new_ArticleLink" RENAME TO "ArticleLink";
CREATE UNIQUE INDEX "ArticleLink_apiKey_key" ON "ArticleLink"("apiKey");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
