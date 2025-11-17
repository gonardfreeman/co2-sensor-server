import { inputObjectType } from "nexus";
import { SensorType, UnitType, ReadingType } from "../objects";

export const IncludeInputType = inputObjectType({
  name: "IncludeInput",
  description: "Defines what objects that needs to be included",
  definition(t) {
    t.boolean(UnitType.name);
    t.boolean(SensorType.name);
    t.boolean(ReadingType.name);
  },
});
