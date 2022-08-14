import { getTasks, getTasksLists } from "@/server/lib/googleTasks";
import { z } from "zod";
import { createProtectedRouter } from "../protected-router";

export const googleTaskRouter = createProtectedRouter()
  .query("getLists", {
    resolve: async ({ ctx }) => {
      const account = await ctx.prisma.account.findFirst({
        where: { userId: ctx.session.user.id },
        select: { access_token: true },
      });

      if (!account?.access_token) {
        throw new Error("Access token not found");
      }
      const { access_token } = account;
      const taskLists = await getTasksLists(access_token);
      return taskLists;
    },
  })
  .query("getTasks", {
    input: z.object({
      listId: z.string(),
    }),
    resolve: async ({ ctx, input }) => {
      const account = await ctx.prisma.account.findFirst({
        where: { userId: ctx.session.user.id },
        select: { access_token: true },
      });

      if (!account?.access_token) {
        throw new Error("Access token not found");
      }
      const { access_token } = account;
      const tasks = await getTasks(access_token, input.listId);
      return tasks;
    },
  });
