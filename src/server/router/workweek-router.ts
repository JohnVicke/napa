import {
  getCurrentWeekMonday,
  getCurrentWeekNumber,
  getCurrentWeekSunday,
} from "@/utils/date-helpers";
import { createProtectedRouter } from "./protected-router";

export const workweekRouter = createProtectedRouter()
  .query("getSummary", {
    async resolve({ ctx }) {
      console.log("workWeek", getCurrentWeekNumber());
      const user = await ctx.prisma.user.findFirst({
        where: { id: ctx.session.user.id },
      });

      if (!user) {
        throw new Error("User not found");
      }

      const flexHours = await ctx.prisma.flexHours.findFirst({
        where: { userId: ctx.session.user.id },
      });

      if (!flexHours) {
        throw new Error("No flex hours found");
      }

      return { flex: flexHours.hours, total: user.totalHours };
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
          workWeekUnique: { weekNumber, userId: ctx.session.user.id },
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
    async resolve({ ctx }) {},
  });
