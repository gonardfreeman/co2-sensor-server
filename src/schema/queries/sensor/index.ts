import { extendType } from "nexus";
import { sensorListQueryResolver } from "./list";

export const SensorQuery = extendType({
  type: "Query",
  definition(t) {
    sensorListQueryResolver(t);
  },
});
