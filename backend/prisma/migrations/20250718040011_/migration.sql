/*
  Warnings:

  - Changed the type of `category` on the `Item` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Item" DROP COLUMN "category",
ADD COLUMN     "category" TEXT NOT NULL;

-- DropEnum
DROP TYPE "ItemCategory";

-- DropEnum
DROP TYPE "ItemPropFilter";

-- DropEnum
DROP TYPE "Order";

-- DropEnum
DROP TYPE "UserPropFilter";
