/*
  Warnings:

  - You are about to drop the column `unit_id` on the `reading` table. All the data in the column will be lost.
  - Added the required column `unit_id` to the `sensor` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."reading" DROP CONSTRAINT "reading_unit_id_fkey";

-- AlterTable
ALTER TABLE "reading" DROP COLUMN "unit_id";

-- AlterTable
ALTER TABLE "sensor" ADD COLUMN     "unit_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "sensor" ADD CONSTRAINT "sensor_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
