import { getTasks, getTasksLists } from "@/server/lib/googleTasks";
import { z } from "zod";
import { createProtectedGoogleRouter } from "../google-protected-router";
import { createProtectedRouter } from "../protected-router";

export const googleTaskRouter = createProtectedGoogleRouter()
  .query("getLists", {
    resolve: async ({ ctx }) => {
      const { access_token } = ctx;
      const taskLists = await getTasksLists(access_token);
      return taskLists;
    },
  })
  .query("getTasks", {
    input: z.object({
      listId: z.string(),
    }),
    resolve: async ({ ctx, input }) => {
      const { access_token } = ctx;
      const tasks = await getTasks(access_token, input.listId);
      return tasks;
    },
  });
