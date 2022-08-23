import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";
import React from "react";
import { TaskPage } from "./TaskPage";

interface TasksPageProps {}

export const TasksPage = ({}: TasksPageProps) => {
  const { isLoading, data } = trpc.useQuery(["googleTask.getLists"]);

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <TaskPage id={data[0].id} taskLists={data} />
    </div>
  );
};
