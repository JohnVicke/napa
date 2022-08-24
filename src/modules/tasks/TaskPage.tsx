import React from "react";
import { trpc } from "@/utils/trpc";
import { inferQueryResponse } from "@/pages/api/trpc/[trpc]";
import { TasksTabs } from "./TasksTabs";
import { Reorder } from "framer-motion";
import { Icon } from "@/components/icon/Icon";
import { AddTaskModal } from "./AddTaskModalProps";

type Task = inferQueryResponse<"googleTask.getTasks">[0];

const TaskItem = ({
  task,
  update,
}: {
  task: Task;
  update: (task: Partial<Task>) => void;
}) => {
  const completed = task.status === "completed";
  const onCheck = () => {
    update({
      ...task,
      status: completed ? "needsAction" : "completed",
    });
  };

  return (
    <div className="rounded-lg bg-base-200 p-4">
      <div className="align-center flex ">
        <input
          type="checkbox"
          checked={completed}
          onChange={onCheck}
          className="checkbox"
        />
        <div className="mr-4" />
        <p>{task.title} </p>
      </div>
    </div>
  );
};

const DraggableItems = ({
  data,
  id,
}: {
  data: inferQueryResponse<"googleTask.getTasks">;
  id: string;
}) => {
  const { setQueryData } = trpc.useContext();
  const handleReorder = (items: inferQueryResponse<"googleTask.getTasks">) => {
    setQueryData(["googleTask.getTasks", { id }], items);
  };
  return (
    <Reorder.Group
      axis="y"
      values={data}
      onReorder={handleReorder}
      className="flex flex-col gap-2"
    >
      {data.map((task) => (
        <Reorder.Item key={task.id} value={task}>
          <TaskItem update={() => undefined} task={task} />
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
};

interface TaskPageProps {
  id: string;
  taskLists: inferQueryResponse<"googleTask.getLists">;
}

export const TaskPage = ({ id, taskLists }: TaskPageProps) => {
  const { data, isLoading } = trpc.useQuery(["googleTask.getTasks", { id }]);
  const { setQueryData, getQueryData } = trpc.useContext();

  const { mutate } = trpc.useMutation(["googleTask.updateTask"], {
    onMutate: ({ taskId, task }) => {
      const optimisticTask = data?.find((t) => t.id === taskId);
      if (data && optimisticTask) {
        setQueryData(
          ["googleTask.getTasks", { id }],
          [
            ...data.map((t) =>
              t.id === taskId ? { ...optimisticTask, ...task } : t,
            ),
          ],
        );
      }
      return { ...optimisticTask, ...task };
    },
  });

  const updateTask = (listId: string, taskId: string, task: Partial<Task>) => {
    mutate({ listId, task, taskId });
  };

  return (
    <TasksTabs taskLists={taskLists} activeId={id}>
      <div className="mt-4" />
      {data && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            {data
              .filter((task) => task.status === "needsAction")
              .map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  update={(taskInput: Partial<Task>) =>
                    updateTask(id, task.id, taskInput)
                  }
                />
              ))}
          </div>
          <h5>completed</h5>
          <div className="flex flex-col gap-2">
            {data
              .filter((task) => task.status === "completed")
              .map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  update={(taskInput: Partial<Task>) =>
                    updateTask(id, task.id, taskInput)
                  }
                />
              ))}
          </div>
          <label
            htmlFor="add-task-modal"
            className="modal-button btn btn-primary"
          >
            Add task
            <Icon icon="ri-add-box-fill" className="ml-2 font-normal" />
          </label>
          <AddTaskModal listId={id} />
        </div>
      )}
    </TasksTabs>
  );
};
