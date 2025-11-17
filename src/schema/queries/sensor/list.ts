import type { ObjectDefinitionBlock } from "nexus/dist/core";
import { SensorType } from "../../objects";

export const sensorListQueryResolver = (t: ObjectDefinitionBlock<"Query">) => {
  t.nonNull.list.nonNull.field("sensor", {
    type: SensorType,
    resolve: (_, __, ctx) => {
      return ctx.prisma.sensor.findMany({
        include: {
          unit: true,
          readings: true,
        },
      });
    },
  });
};
