-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Contact" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL,
    "Phone" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "Image" TEXT NOT NULL DEFAULT 'default'
);
INSERT INTO "new_Contact" ("Description", "Name", "Phone", "id") SELECT "Description", "Name", "Phone", "id" FROM "Contact";
DROP TABLE "Contact";
ALTER TABLE "new_Contact" RENAME TO "Contact";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
