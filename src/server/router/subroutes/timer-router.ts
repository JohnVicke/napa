import { z } from "zod";
import { createProtectedRouter } from "../protected-router";

export const timerRouter = createProtectedRouter()
  .query("getTimer", {
    async resolve({ ctx }) {
      try {
        const timer = await ctx.prisma.timer.findFirstOrThrow({
          where: { userId: ctx.session.user.id },
        });
        return timer;
      } catch (error) {
        console.error(error);
        return;
      }
    },
  })
  .mutation("startTimer", {
    async resolve({ ctx }) {
      const timer = await ctx.prisma.timer.upsert({
        where: { userId: ctx.session.user.id },
        update: {
          startTime: new Date(),
          on: true,
        },
        create: {
          userId: ctx.session.user.id,
          startTime: new Date(),
        },
      });
      return timer;
    },
  })
  .mutation("stopTimer", {
    input: z.object({
      workWeekId: z.number(),
    }),
    async resolve({ ctx, input }) {
      const today = new Date().getDay();

      const timer = await ctx.prisma.timer.findFirst({
        where: { userId: ctx.session.user.id },
      });

      if (!timer?.startTime) {
        throw new Error("wattt");
      }

      const timeEntry = {
        startTime: timer.startTime,
        endTime: new Date(),
      };

      console.log(input.workWeekId);

      const dayEntry = await ctx.prisma.workDay.upsert({
        where: {
          workWeekId_day: {
            day: today,
            workWeekId: input.workWeekId,
          },
        },
        create: {
          day: today,
          workWeekId: input.workWeekId,
          WorkDayTimeEntry: {
            create: {
              ...timeEntry,
            },
          },
        },
        update: {
          WorkDayTimeEntry: {
            create: {
              ...timeEntry,
            },
          },
        },
        include: {
          WorkDayTimeEntry: {
            orderBy: {
              id: "desc",
            },
          },
        },
      });

      const updateTimer = await ctx.prisma.timer.update({
        where: { userId: ctx.session.user.id },
        data: {
          on: false,
          startTime: undefined,
        },
      });

      return dayEntry;
    },
  });
