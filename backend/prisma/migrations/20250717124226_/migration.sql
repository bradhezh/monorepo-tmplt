-- CreateEnum
CREATE TYPE "Order" AS ENUM ('asc', 'desc');

-- CreateEnum
CREATE TYPE "UserPropFilter" AS ENUM ('created_at', 'updated_at', 'username', 'name', 'email');

-- CreateEnum
CREATE TYPE "ItemPropFilter" AS ENUM ('created_at', 'updated_at', 'name', 'category', 'price', 'stock', 'user_id');
