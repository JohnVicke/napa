import { z } from "zod";
import { createProtectedRouter } from "../protected-router";

export const workDayRouter = createProtectedRouter().query("getWorkDay", {
  input: z.object({
    id: z.number(),
  }),
  async resolve({ ctx, input }) {
    const workDay = await ctx.prisma.workDay.findFirst({
      where: { id: input.id },
      include: { WorkDayTimeEntry: true },
    });

    return workDay;
  },
});
