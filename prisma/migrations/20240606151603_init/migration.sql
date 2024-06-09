/*
  Warnings:

  - Added the required column `apiKey` to the `UserPreferences` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserPreferences" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "backgroundColor" TEXT NOT NULL,
    "textColor" TEXT NOT NULL,
    "bannerColor" TEXT NOT NULL,
    "apiKey" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "UserPreferences_apiKey_fkey" FOREIGN KEY ("apiKey") REFERENCES "ApiKey" ("key") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserPreferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserPreferences" ("backgroundColor", "bannerColor", "id", "textColor", "userId") SELECT "backgroundColor", "bannerColor", "id", "textColor", "userId" FROM "UserPreferences";
DROP TABLE "UserPreferences";
ALTER TABLE "new_UserPreferences" RENAME TO "UserPreferences";
CREATE UNIQUE INDEX "UserPreferences_apiKey_key" ON "UserPreferences"("apiKey");
CREATE UNIQUE INDEX "UserPreferences_userId_key" ON "UserPreferences"("userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
