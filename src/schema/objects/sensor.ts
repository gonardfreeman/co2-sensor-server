import { sensor } from "nexus-prisma";
import { objectType } from "nexus";

export const SensorType = objectType({
  name: sensor.$name,
  description: sensor.$description,
  definition(t) {
    t.field(sensor.id);
    t.field(sensor.name);
    t.field(sensor.unit);
    t.field(sensor.unit_id);
    t.list.field(sensor.readings);
  },
});
