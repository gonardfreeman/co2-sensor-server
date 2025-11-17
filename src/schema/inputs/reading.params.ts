import { inputObjectType } from "nexus";
import { IncludeInputType } from "./include";
import { FloatFilterInput } from "./float";

export const ReadingInputParams = inputObjectType({
  name: "ReadingInputParams",
  definition(t) {
    t.field({
      name: "include",
      type: IncludeInputType,
    });
    t.field("value", {
      type: FloatFilterInput,
    });
  },
});
