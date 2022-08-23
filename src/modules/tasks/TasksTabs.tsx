import React from "react";
import { inferQueryResponse } from "@/pages/api/trpc/[trpc]";
import Link from "next/link";
import { Icon } from "@/components/icon/Icon";
import { TextInput } from "@/components/TextInput";
import { useFormik } from "formik";
import { trpc } from "@/utils/trpc";

type AddTaskModalProps = {
  listId: string;
};

const AddTaskModal = ({ listId }: AddTaskModalProps) => {
  const { getQueryData, setQueryData } = trpc.useContext();
  const { mutate } = trpc.useMutation(["googleTask.createTask"], {
    onSuccess: (newTask) => {
      const listData = getQueryData(["googleTask.getTasks", { id: listId }]);
    },
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      notes: "",
    },
    onSubmit: (values) => {
      mutate({ listId, task: values });
    },
  });

  return (
    <div>
      <input type="checkbox" id="add-task-modal" className="modal-toggle" />
      <label htmlFor="add-task-modal" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-col gap-4">
              <TextInput
                id="title"
                name="title"
                label="Title"
                type="text"
                onChange={formik.handleChange}
              />
              <TextInput
                id="description"
                name="description"
                label="Description"
                type="text"
                onChange={formik.handleChange}
              />
              <button type="submit" className="btn btn-primary">
                Create task
              </button>
            </div>
          </form>
        </label>
      </label>
    </div>
  );
};

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
      <label htmlFor="add-task-modal" className="modal-button btn btn-primary">
        Add task
        <Icon icon="ri-add-box-fill" className="ml-2 font-normal" />
      </label>
      <AddTaskModal listId={activeId} />
    </div>
  );
};
