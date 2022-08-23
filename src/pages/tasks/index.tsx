import { createTRPCClient } from "@trpc/client";
import { TasksPage } from "@/modules/tasks/TasksPage";
import { GetServerSideProps } from "next/types";
import React from "react";

const Tasks = () => {
  return <TasksPage />;
};

export default Tasks;
