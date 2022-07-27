import { createRouter } from "./context";
import { z } from "zod";

export const exampleRouter = createRouter()
  .query("hello", {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    },
  })
  .query("getAll", {
    async resolve({ ctx }) {
      const thingys = await ctx.prisma.test.findMany();
      console.log(thingys);
      return thingys;
    },
  })
  .mutation("createTest", {
    input: z.object({
      text: z.string(),
    }),
    async resolve({ input, ctx }) {
      return ctx.prisma.test.create({
        data: {
          thingy: input.text,
        },
      });
    },
  });
