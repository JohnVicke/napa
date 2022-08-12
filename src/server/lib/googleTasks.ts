import { z } from "zod";

const BASE_URL = "https://tasks.googleapis.com/tasks/v1";

const TaskListSchema = z.object({
  kind: z.string(),
  id: z.string(),
  etag: z.string(),
  title: z.string(),
  updated: z.string(),
  selfLink: z.string(),
  position: z.string(),
  status: z.string(),
  links: z.array(z.string()).nullish(),
});

const TaskListResponseSchem = z.object({
  kind: z.string(),
  etag: z.string(),
  items: z.array(TaskListSchema).nullish(),
});

export type TaskList = z.infer<typeof TaskListSchema>;

export const getTasksLists = async (access_token: string) => {
  const res = await fetch(`${BASE_URL}/users/@me/lists`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  const json = await res.json();
  const taskResponse = await TaskListResponseSchem.parseAsync(json);
  console.log(taskResponse);
  const tasks = taskResponse.items;

  return tasks;
};

const TaskSchema = z.object({});
export type Task = z.infer<typeof TaskSchema>;

export const getTasks = async (access_token: string, id: string) => {
  const res = await fetch(`${BASE_URL}/lists/${id}/tasks`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return res.json();
};
