import {
  TaskList,
  taskListParser,
  Task,
  tasksParser,
  CreateTaskInput,
  taskParser,
} from "./utils";

const BASE_URL = "https://tasks.googleapis.com/tasks/v1";

export const getTasksLists = async (
  access_token: string,
): Promise<TaskList[]> => {
  try {
    const res = await fetch(`${BASE_URL}/users/@me/lists`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    const json = await res.json();
    const { items } = taskListParser(json);

    return items;
  } catch (err) {
    throw new Error("Invalid response from Google Tasks API");
  }
};

export const getTasks = async (
  access_token: string,
  id: string,
): Promise<Task[]> => {
  try {
    const res = await fetch(`${BASE_URL}/lists/${id}/tasks`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    const json = await res.json();
    const { items } = tasksParser(json);
    return items;
  } catch (err) {
    throw new Error("Invalid response from Google Tasks API");
  }
};

export const createTask = async (
  access_token: string,
  input: CreateTaskInput,
): Promise<Task> => {
  const res = await fetch(`${BASE_URL}/lists/${input.listId}/tasks`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify(input.task),
  });
  const json = await res.json();
  const task = taskParser(json);
  return task;
};

export const updateTask = async (
  access_token: string,
  listId: string,
  taskId: string,
  task: Partial<Task>,
): Promise<Task> => {
  const res = await fetch(`${BASE_URL}/lists/${listId}/tasks/${taskId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify({ ...task, id: taskId }),
  });

  const json = await res.json();
  const updatedTask = taskParser(json);

  return updatedTask;
};
