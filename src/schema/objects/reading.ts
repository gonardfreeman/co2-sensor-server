import { reading } from "nexus-prisma";
import { objectType } from "nexus";
import { SensorType } from "./sensor";

export const ReadingType = objectType({
  name: reading.$name,
  definition(t) {
    t.field(reading.id);
    t.field(reading.value);
    t.field(reading.sensor_id);
    t.field(reading.sensor.name, {
      type: SensorType,
      resolve(parent, __, ctx) {
        return ctx.prisma.sensor.findUnique({
          where: {
            id: parent.sensor_id,
          },
        });
      },
    });
  },
});
