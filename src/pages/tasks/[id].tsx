import { TaskPage } from "@/modules/tasks/TaskPage";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";
import React from "react";

interface TaskProps {}

const Task = ({}: TaskProps) => {
  const context = trpc.useContext();
  const data = context.getQueryData(["googleTask.getLists"]);

  const router = useRouter();
  const { id } = router.query;

  if (typeof id !== "string" || !data?.taskLists) {
    return null;
  }

  return <TaskPage id={id} taskLists={data.taskLists} />;
};

export default Task;
