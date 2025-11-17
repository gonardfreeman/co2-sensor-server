/*
  Warnings:

  - A unique constraint covering the columns `[unit_id]` on the table `sensor` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "sensor_unit_id_key" ON "sensor"("unit_id");
