import { arg } from "nexus";
import type { ObjectDefinitionBlock } from "nexus/dist/core";
import { UnitInputParams } from "../../inputs";
import { UnitType } from "../../objects";

export const unitListQueryResolver = (t: ObjectDefinitionBlock<"Query">) => {
  t.nonNull.list.nonNull.field("unit", {
    type: UnitType,
    args: {
      params: arg({ type: UnitInputParams.name }),
    },
    resolve: (_, args, ctx) =>
      ctx.prisma.unit.findMany({
        include:
          typeof args.params?.include?.sensor === "boolean"
            ? {
                sensor: args.params?.include?.sensor,
              }
            : undefined,
        where: {
          name: args.params?.name ?? undefined,
          label: args.params?.label ?? undefined,
          sensor: args.params?.sensor_name
            ? { name: args.params.sensor_name }
            : undefined,
        },
      }),
  });
};
