import { inputObjectType } from "nexus";
import { IncludeInputType } from "./include";

export const UnitInputParams = inputObjectType({
  name: "UnitInputParams",
  definition(t) {
    t.field({
      name: "include",
      type: IncludeInputType,
    });
    t.string("name", { description: "name of unit" });
    t.string("label", { description: "label of unit" });
    t.string("sensor_name", { description: "name of sensor" });
  },
});
