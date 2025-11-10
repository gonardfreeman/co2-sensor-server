import path from "path";
import { sensor /*, reading*/, unit } from "nexus-prisma";
import { makeSchema, objectType, queryType } from "nexus";

const SensorType = objectType({
  name: sensor.$name,
  description: sensor.$description,
  definition(t) {
    t.field(sensor.id);
    t.field(sensor.name);
    t.field;
  },
});

const UnitType = objectType({
  name: unit.$name,
  definition(t) {
    t.field(unit.id);
    t.field(unit.name);
    t.field(unit.label);
    t.field(unit.sensor);
  },
});

const QueryType = queryType({
  definition(t) {
    t.nonNull.list.nonNull.field("unit", {
      type: UnitType,
      resolve(_, __, ctx) {
        return ctx.prisma.unit.findMany({
          include: {
            sensor: true,
          },
        });
      },
    });
    // t.list.field("sensors", {
    //   type: SensorType,
    //   resolve: async (_root, _args, ctx) => ctx.prisma.sensor.findMany(),
    // });
    // t.list.field("units", {
    //   type: UnitType,
    //   resolve: async (_root, _args, ctx) =>
    //     ctx.prisma.unit.findMany({
    //       select: {
    //         id: true,
    //         name: true,
    //         label: true,
    //       },
    //     }),
    // });
  },
});

export const schema = makeSchema({
  types: [QueryType, SensorType],
  outputs: {
    typegen: path.join(__dirname, "../nexus-typegen.ts"),
    schema: path.join(__dirname, "../schema.graphql"),
  },
  contextType: {
    module: path.join(__dirname, "context.ts"),
    export: "Context",
  },
});
