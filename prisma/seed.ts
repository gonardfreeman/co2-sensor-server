import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.$connect();
  await prisma.reading.deleteMany();
  await prisma.sensor.deleteMany();
  await prisma.unit.deleteMany();

  const co2 = await prisma.unit.create({
    data: {
      name: "co2",
      label: "ppm",
    },
  });

  const humidity = await prisma.unit.create({
    data: {
      name: "humidity",
      label: "%",
    },
  });

  const co2_sensor = await prisma.sensor.create({
    data: {
      name: "co2_sensor",
      unit_id: co2.id,
    },
  });

  const humidity_sensor = await prisma.sensor.create({
    data: {
      name: "humidity_sensor",
      unit_id: humidity.id,
    },
  });

  await prisma.reading.create({
    data: {
      value: 10,
      sensor_id: co2_sensor.id,
    },
  });

  await prisma.reading.create({
    data: {
      value: 100,
      sensor_id: humidity_sensor.id,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(0);
  });
