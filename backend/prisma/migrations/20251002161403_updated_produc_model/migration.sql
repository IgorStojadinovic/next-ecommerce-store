/*
  Warnings:

  - You are about to drop the column `description` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `features` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `images` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `inBox` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `Product` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."Product_slug_key";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "description",
DROP COLUMN "features",
DROP COLUMN "images",
DROP COLUMN "inBox",
DROP COLUMN "slug";
