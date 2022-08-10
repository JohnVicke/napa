import {
  getLastMondayFromDate,
  getNextSundayFromDate,
  getWeeknumberFromDate,
} from "@/utils/date-helpers";
import { z } from "zod";
import { createProtectedRouter } from "../protected-router";

export const timeEntryRouter = createProtectedRouter()
  .mutation("addTimeEntry", {
    input: z.object({
      startTime: z.date(),
      endTime: z.date(),
      description: z.string().nullish(),
    }),
    async resolve({ ctx, input }) {
      const weekNumber = getWeeknumberFromDate(input.startTime);

      const timeEntryData = {
        startTime: input.startTime,
        endTime: input.endTime,
      };

      const workweek = await ctx.prisma.workWeek.upsert({
        where: {
          weekNumber_userId: { weekNumber, userId: ctx.session.user.id },
        },
        create: {
          startDate: getLastMondayFromDate(input.startTime),
          endDate: getNextSundayFromDate(input.endTime),
          userId: ctx.session.user.id,
          weekNumber,
        },
        update: {},
      });

      const dayEntry = await ctx.prisma.workDay.upsert({
        where: {
          workWeekId_day: {
            day: input.startTime.getDay(),
            workWeekId: workweek.id,
          },
        },
        create: {
          workWeekId: workweek.id,
          day: input.startTime.getDay(),
          WorkDayTimeEntry: {
            create: {
              ...timeEntryData,
            },
          },
        },
        update: {
          WorkDayTimeEntry: {
            create: {
              ...timeEntryData,
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

      return dayEntry;
    },
  })
  .query("getTimeEntry", {
    input: z.object({
      id: z.number(),
    }),
    resolve: async ({ ctx, input: { id } }) => {
      const timeEntry = await ctx.prisma.workDayTimeEntry.findFirst({
        where: { id },
      });
      if (!timeEntry) {
        throw new Error("No time entry found");
      }
      return timeEntry;
    },
  })
  .mutation("updateTimeEntry", {
    input: z.object({
      id: z.number(),
      startTime: z.date().nullish(),
      endTime: z.date().nullish(),
      description: z.string().nullish(),
    }),
    resolve: async ({ ctx, input }) => {
      const timeEntry = await ctx.prisma.workDayTimeEntry.update({
        where: { id: input.id },
        data: {
          startTime: input.startTime || undefined,
          endTime: input.endTime || undefined,
          description: input.description || undefined,
        },
      });
      return timeEntry;
    },
  })
  .mutation("deleteTimeEntry", {
    input: z.object({
      id: z.number(),
    }),
    resolve: async ({ ctx, input }) => {
      const timeEntry = await ctx.prisma.workDayTimeEntry.delete({
        where: { id: input.id },
      });
      return true;
    },
  });
