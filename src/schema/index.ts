import path from "path";
import { makeSchema } from "nexus";
import * as objects from "./objects";
import * as queryTypes from "./queries";
import * as inputTypes from "./inputs";

export const schema = makeSchema({
  types: [objects, queryTypes, inputTypes],
  outputs: {
    typegen: path.join(__dirname, "../nexus-typegen.ts"),
    schema: path.join(__dirname, "../schema.graphql"),
  },
  contextType: {
    module: path.join(__dirname, "context.ts"),
    export: "Context",
  },
});
