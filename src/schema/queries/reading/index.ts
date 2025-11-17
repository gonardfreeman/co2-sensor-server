import { extendType } from "nexus";
import { listReadingQueryResolver } from "./list";

export const ReadingQuery = extendType({
  type: "Query",
  definition(t) {
    listReadingQueryResolver(t);
  },
});
