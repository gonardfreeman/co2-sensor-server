import { arg } from "nexus";
import { type ObjectDefinitionBlock } from "nexus/dist/core";
import { ReadingType } from "../../objects";
import { ReadingInputParams } from "../../inputs";

type ReadingIncludeParams = {
  sensor?: boolean | null | undefined;
  unit?: boolean | null | undefined;
};

function generateIncludes(include: ReadingIncludeParams | null | undefined) {
  if (include?.sensor !== true) {
    return undefined;
  }
  if (include.unit === true) {
    return {
      sensor: {
        include: {
          unit: true,
        },
      },
    };
  }
  return {
    sensor: true,
  };
}

export const listReadingQueryResolver = (t: ObjectDefinitionBlock<"Query">) => {
  t.nonNull.list.nonNull.field("reading", {
    type: ReadingType,
    args: {
      params: arg({ type: ReadingInputParams.name }),
    },
    resolve: (_, { params }, ctx) => {
      const { include, value } = params ?? {};
      console.log("include", generateIncludes(include));
      return ctx.prisma.reading.findMany({
        include: generateIncludes(include),
        where: {
          value: value
            ? {
                equals: value.equals ?? undefined,
                gt: value.gt ?? undefined,
                gte: value.gte ?? undefined,
                lt: value.lt ?? undefined,
                lte: value.lte ?? undefined,
              }
            : undefined,
        },
      });
    },
  });
};
