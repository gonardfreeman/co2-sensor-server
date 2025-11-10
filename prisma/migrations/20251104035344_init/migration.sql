-- CreateTable
CREATE TABLE "sensor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "reading_id" INTEGER NOT NULL,

    CONSTRAINT "sensor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reading" (
    "id" SERIAL NOT NULL,
    "value" INTEGER NOT NULL DEFAULT 0,
    "unit_id" INTEGER NOT NULL,

    CONSTRAINT "reading_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "unit" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "unit_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "sensor" ADD CONSTRAINT "sensor_reading_id_fkey" FOREIGN KEY ("reading_id") REFERENCES "reading"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reading" ADD CONSTRAINT "reading_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
