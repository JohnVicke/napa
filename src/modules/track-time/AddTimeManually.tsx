import React from "react";
import { trpc } from "@/utils/trpc";
import { TextInput } from "@/components/TextInput";
import { Icon } from "@/components/icon/Icon";
import { useToastStore } from "../toast/toastStore";
import { useFormik } from "formik";
import { getLocaleISOString } from "@/utils/date-helpers";

export const AddTimeManually = ({
  setEditType,
}: {
  setEditType: () => void;
}) => {
  const { addToast } = useToastStore();
  const { getQueryData, setQueryData } = trpc.useContext();
  const timentryMutation = trpc.useMutation(["timeEntry.addTimeEntry"], {
    onSuccess: (day) => {
      const weekData = getQueryData(["workweek.getWorkWeek"]);
      if (weekData?.workWeek) {
        setQueryData(["workweek.getWorkWeek"], {
          workWeek: {
            ...weekData.workWeek,
            WorkDay: [
              ...weekData.workWeek.WorkDay.map((d) =>
                d.id === day.id ? day : d
              ),
            ],
          },
        });
        addToast({
          message: "Time entry added",
          type: "success",
        });
      }
    },
    onError: (error) => {
      addToast({
        message: error.message,
        type: "error",
      });
    },
  });

  const formik = useFormik({
    initialValues: {
      description: "",
      startTime: getLocaleISOString({ hours: 8, minutes: 0 }),
      endTime: getLocaleISOString({ hours: 17, minutes: 0 }),
    },
    onSubmit: ({ description, endTime, startTime }) => {
      timentryMutation.mutate({
        description,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex gap-2 w-full flex-col lg:flex-row">
        <TextInput
          name="description"
          className="flex-1"
          label="Description"
          placeholder="Work..."
        />
        <div className="flex gap-2">
          <TextInput
            id="startTime"
            name="startTime"
            label="From"
            type="datetime-local"
            onChange={formik.handleChange}
            value={formik.values.startTime}
          />
          <TextInput
            id="endTime"
            name="endTime"
            label="To"
            type="datetime-local"
            onChange={formik.handleChange}
            value={formik.values.endTime}
          />
        </div>
      </div>
      <div className="flex gap-2 justify-end mt-4">
        <button type="submit" className="btn btn-primary">
          <Icon icon="ri-save-fill" className="font-normal mr-2" />
          Save
        </button>
        <button className="btn btn-outline" onClick={setEditType}>
          <Icon icon="ri-time-fill" className="font-normal mr-2" />
          Use timer
        </button>
      </div>
    </form>
  );
};
