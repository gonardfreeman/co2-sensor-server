import { inputObjectType } from "nexus";

export const FloatFilterInput = inputObjectType({
  name: "FloatFilterInput",
  definition(t) {
    t.float("equals");
    t.float("gt", { description: "greater than" });
    t.float("gte", { description: "greater than or equal" });
    t.float("lt", { description: "less than" });
    t.float("lte", { description: "less than or equal" });
  },
});
