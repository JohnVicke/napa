import {
  getCurrentWeekMonday,
  getCurrentWeekNumber,
  getCurrentWeekSunday,
  getElapsedHours,
} from "@/utils/date-helpers";
import { z } from "zod";
import { createProtectedRouter } from "../protected-router";

export const workweekRouter = createProtectedRouter()
  .query("getSummary", {
    async resolve({ ctx }) {
      const user = await ctx.prisma.user.findFirst({
        where: { id: ctx.session.user.id },
        include: {
          FlexHours: true,
          workWeeks: true,
        },
      });

      if (!user) {
        throw new Error("User not found");
      }

      return { flex: user.FlexHours?.hours, total: user.totalHours };
    },
  })

  .query("getWorkWeek", {
    async resolve({ ctx }) {
      const weekNumber = getCurrentWeekNumber();

      const workWeek = await ctx.prisma.workWeek.findFirst({
        where: {
          userId: ctx.session.user.id,
          weekNumber,
        },
        include: {
          WorkDay: {
            orderBy: {
              createdAt: "desc",
            },
            include: { WorkDayTimeEntry: { orderBy: { id: "desc" } } },
          },
        },
      });

      return { workWeek };
    },
  })
  .mutation("createWorkWeek", {
    input: z.object({
      totalHours: z.number().nullish(),
    }),
    async resolve({ ctx, input }) {
      const weekNumber = getCurrentWeekNumber();
      const workWeek = await ctx.prisma.workWeek.upsert({
        where: {
          weekNumber_userId: { weekNumber, userId: ctx.session.user.id },
        },
        update: {},
        create: {
          totalHours: input?.totalHours || undefined,
          startDate: getCurrentWeekMonday(),
          endDate: getCurrentWeekSunday(),
          userId: ctx.session.user.id,
          weekNumber,
          WorkDay: {
            create: {
              day: new Date().getDay(),
            },
          },
        },
      });

      return { workWeek };
    },
  });
