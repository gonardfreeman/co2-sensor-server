import { unit } from "nexus-prisma";
import { objectType } from "nexus";

export const UnitType = objectType({
  name: unit.$name,
  definition(t) {
    t.field(unit.id);
    t.field(unit.name);
    t.field(unit.label);
    t.field(unit.sensor);
  },
});
