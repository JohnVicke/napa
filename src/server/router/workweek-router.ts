import {
  getCurrentWeekMonday,
  getCurrentWeekNumber,
  getCurrentWeekSunday,
  getElapsedHours,
} from "@/utils/date-helpers";
import { z } from "zod";
import { createProtectedRouter } from "./protected-router";

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
          WorkDay: { include: { WorkDayTimeEntry: true } },
        },
      });

      if (!workWeek) {
        throw new Error("Work week not found");
      }

      const hasTimerOn = workWeek.WorkDay.reduce(
        (prev, curr) => {
          const hasTimerOn = curr.WorkDayTimeEntry.find(
            (entry) => !!entry.timerOn
          );
          if (hasTimerOn) {
            return {
              timerOn: true,
              id: hasTimerOn.id,
            };
          }
          return prev;
        },
        { timerOn: false, id: -1 }
      );

      return { workWeek, hasTimerOn };
    },
  })

  .mutation("startTimer", {
    async resolve({ ctx }) {
      const weekNumber = getCurrentWeekNumber();
      const today = new Date().getDay();

      const workWeek = await ctx.prisma.workWeek.upsert({
        where: {
          weekNumber_userId: { weekNumber, userId: ctx.session.user.id },
        },
        update: {},
        create: {
          startDate: getCurrentWeekMonday(),
          endDate: getCurrentWeekSunday(),
          userId: ctx.session.user.id,
          weekNumber,
        },
      });

      const workDay = await ctx.prisma.workDay.upsert({
        where: {
          workWeekId_day: { day: today, workWeekId: workWeek.id },
        },
        update: {},
        create: {
          complete: false,
          day: today,
          workWeekId: workWeek.id,
        },
      });

      const workdayTimeEntry = await ctx.prisma.workDayTimeEntry.create({
        data: {
          startTime: new Date(),
          timerOn: true,
          workDayId: workDay.id,
        },
      });

      return { timerStarted: true, workdayTimeEntry };
    },
  })

  .mutation("stopTimer", {
    input: z.object({
      id: z.number(),
    }),
    async resolve({ input, ctx }) {
      const endTime = new Date();
      const timeEntry = await ctx.prisma.workDayTimeEntry.update({
        where: { id: input.id },
        data: { timerOn: false, endTime },
      });

      const user = await ctx.prisma.user.update({
        where: { id: ctx.session.user.id },
        data: {
          totalHours: {
            increment: getElapsedHours(timeEntry.startTime, endTime),
          },
        },
      });
      console.log(user);
      return { timerStopped: true };
    },
  });
