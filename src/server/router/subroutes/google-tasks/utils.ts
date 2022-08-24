import { z } from "zod";

type ParseFactoryParams<T> = z.Schema<T>;

const createParseFunction = <T>(schema: ParseFactoryParams<T>) => {
  const parse = (json: any) => {
    return schema.parse(json);
  };
  return parse;
};

const TaskListSchema = z.object({
  kind: z.string(),
  id: z.string(),
  etag: z.string(),
  title: z.string(),
  updated: z.string(),
  selfLink: z.string(),
});

const TaskLinkSchema = z.object({
  type: z.string(),
  description: z.string(),
  link: z.string(),
});

const GoogleTasksBaseResponseSchema = <T>(itemsSchema: z.Schema<T>) =>
  z.object({
    kind: z.string(),
    etag: z.string(),
    items: z.array(itemsSchema),
  });

export const TaskSchema = z.object({
  kind: z.string(),
  id: z.string(),
  etag: z.string(),
  title: z.string(),
  updated: z.string(),
  selfLink: z.string(),
  position: z.string(),
  status: z.union([z.literal("needsAction"), z.literal("completed")]),
  due: z.string().optional(),
  links: z.array(TaskLinkSchema.deepPartial()),
  notes: z.string().optional(),
  completed: z.string().optional(),
  deleted: z.boolean().optional(),
  hidden: z.boolean().optional(),
});

export const CreateTaskInputSchema = z.object({
  listId: z.string(),
  task: z.object({
    title: z.string(),
    notes: z.string(),
  }),
});

export type CreateTaskInput = z.infer<typeof CreateTaskInputSchema>;

export const UpdateTaskInputSchema = z.object({
  listId: z.string(),
  taskId: z.string(),
  task: TaskSchema.deepPartial(),
});
export const taskListParser = createParseFunction(
  GoogleTasksBaseResponseSchema(TaskListSchema),
);
export const tasksParser = createParseFunction(
  GoogleTasksBaseResponseSchema(TaskSchema),
);

export const taskParser = createParseFunction(TaskSchema);

export type TaskList = z.infer<typeof TaskListSchema>;
export type Task = z.infer<typeof TaskSchema>;
