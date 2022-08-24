import React from "react";
import { inferQueryResponse } from "@/pages/api/trpc/[trpc]";
import Link from "next/link";
import { Icon } from "@/components/icon/Icon";

interface TasksTabsProps {
  taskLists: inferQueryResponse<"googleTask.getLists">;
  activeId: string;
}

export const TasksTabs = ({
  taskLists,
  activeId,
  children,
}: React.PropsWithChildren<TasksTabsProps>) => {
  const active = "tab-active";
  return (
    <div>
      <div className="tabs">
        {taskLists.map((list) => (
          <Link href={`/tasks/${list.id}`} passHref key={list.id}>
            <a
              className={`tab tab-bordered tab-lg ${
                activeId === list.id ? active : ""
              }`}
            >
              {list.title}
            </a>
          </Link>
        ))}
      </div>
      {children}
    </div>
  );
};
