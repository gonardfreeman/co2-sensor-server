import path from "path";
import { sensor /*, reading*/, unit } from "nexus-prisma";
import {
  arg,
  inputObjectType,
  makeSchema,
  objectType,
  queryType,
  stringArg,
} from "nexus";

const SensorType = objectType({
  name: sensor.$name,
  description: sensor.$description,
  definition(t) {
    t.field(sensor.id);
    t.field(sensor.name);
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

const IncludeInputType = inputObjectType({
  name: "IncludeInput",
  description: "Defines what objects that needs to be included",
  definition(t) {
    t.boolean(UnitType.name);
    t.boolean(SensorType.name);
  },
});

const QueryType = queryType({
  definition(t) {
    t.nonNull.list.nonNull.field("unit", {
      type: UnitType,
      args: {
        include: arg({ type: IncludeInputType.name }),
        name: stringArg({ description: "name of unit" }),
        label: stringArg({ description: "label of unit" }),
        sensor_name: stringArg({ description: "name of sensor" }),
      },
      resolve(_, args, ctx) {
        return ctx.prisma.unit.findMany({
          include:
            typeof args.include?.sensor === "boolean"
              ? {
                  sensor: args.include?.sensor,
                }
              : undefined,
          where: {
            name: args.name ?? undefined,
            label: args.label ?? undefined,
            sensor: {
              some: {
                name: args.sensor_name ?? undefined,
              },
            },
          },
        });
      },
    });
    t.nonNull.list.nonNull.field("sensor", {
      type: SensorType,
      resolve: (_, __, ctx) => {
        return ctx.prisma.sensor.findMany({
          include: {
            unit: true,
            readings: true,
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
  types: [QueryType, SensorType, IncludeInputType],
  outputs: {
    typegen: path.join(__dirname, "../nexus-typegen.ts"),
    schema: path.join(__dirname, "../schema.graphql"),
  },
  contextType: {
    module: path.join(__dirname, "context.ts"),
    export: "Context",
  },
});
