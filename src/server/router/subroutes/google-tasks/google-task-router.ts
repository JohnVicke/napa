import {
  createTask,
  getTasks,
  getTasksLists,
  updateTask,
} from "./google-task-controller";

import { CreateTaskInputSchema, UpdateTaskInputSchema } from "./utils";

import { z } from "zod";
import { createProtectedGoogleRouter } from "../../google-protected-router";

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
      id: z.string(),
    }),
    resolve: async ({ ctx, input }) => {
      const { access_token } = ctx;
      const tasks = await getTasks(access_token, input.id);
      return tasks;
    },
  })
  .mutation("createTask", {
    input: CreateTaskInputSchema,
    resolve: async ({ ctx, input }) => {
      const { access_token } = ctx;
      const task = await createTask(access_token, input);
      return task;
    },
  })
  .mutation("updateTask", {
    input: UpdateTaskInputSchema,
    resolve: async ({ ctx, input }) => {
      const { access_token } = ctx;
      const { listId, taskId, task } = input;

      const updatedTask = await updateTask(access_token, listId, taskId, task);
      return updatedTask;
    },
  });
