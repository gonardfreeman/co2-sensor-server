import { extendType } from "nexus";
import { unitListQueryResolver } from "./list";

export const UnitQuery = extendType({
  type: "Query",
  definition(t) {
    unitListQueryResolver(t);
  },
});
