import { TextInput } from "@/components/TextInput";
import { useFormik } from "formik";
import { trpc } from "@/utils/trpc";

type AddTaskModalProps = {
  listId: string;
};

export const AddTaskModal = ({ listId }: AddTaskModalProps) => {
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
