/*
  Warnings:

  - You are about to drop the column `reading_id` on the `sensor` table. All the data in the column will be lost.
  - Added the required column `sensor_id` to the `reading` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."sensor" DROP CONSTRAINT "sensor_reading_id_fkey";

-- AlterTable
ALTER TABLE "reading" ADD COLUMN     "sensor_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "sensor" DROP COLUMN "reading_id";

-- AddForeignKey
ALTER TABLE "reading" ADD CONSTRAINT "reading_sensor_id_fkey" FOREIGN KEY ("sensor_id") REFERENCES "sensor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
