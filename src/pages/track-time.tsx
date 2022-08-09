import { trpc } from "@/utils/trpc";
import React from "react";
import { TextInput } from "../components/TextInput";
import { withAuthServerSideProps } from "../utils/withAuthServerSideProps";
import { inferQueryResponse } from "./api/trpc/[trpc]";
import { getWeekDayString } from "@/utils/date-helpers";
import { useElapsedTime } from "@/modules/track-time/useElapsedTime";
import { useFormik } from "formik";
import { AddTimeEntry } from "@/modules/track-time/TrackTime";

type WorkDay = inferQueryResponse<"workday.getWorkDay">;

type WorkDayProps = {
  day?: WorkDay;
};

type WorkDayTimeEntryProps = {
  timeEntry: any;
};

const WorkDay = ({ day, children }: React.PropsWithChildren<WorkDayProps>) => {
  if (!day) return <></>;

  return (
    <>
      <div>{getWeekDayString(day.day)}</div>
      <div className="m-2 w-full">{children}</div>
    </>
  );
};

const WorkDayTimeEntry = ({ timeEntry }: WorkDayTimeEntryProps) => {
  const elapsedTime = useElapsedTime(timeEntry.startTime, timeEntry?.endTime);
  return (
    <div className="flex w-full bg-base-200 px-2 py-4 rounded-lg justify-between">
      <div>{elapsedTime}</div>
      <div>
        {timeEntry.startTime?.toLocaleTimeString()} -{" "}
        {timeEntry.endTime?.toLocaleTimeString()}
      </div>
    </div>
  );
};

const CreateWorkWeek = () => {
  const { invalidateQueries } = trpc.useContext();

  const { mutate, isLoading } = trpc.useMutation("workweek.createWorkWeek", {
    onSuccess: () => {
      invalidateQueries(["workweek.getWorkWeek"]);
    },
  });

  const formik = useFormik({
    initialValues: { hours: 40 },
    onSubmit: ({ hours }) => {
      mutate({ totalHours: hours });
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col">
        <TextInput
          id="hours"
          name="hours"
          onChange={formik.handleChange}
          value={formik.values.hours}
          type="number"
          label="Hours scheduled this week"
        />
        <div className="mt-2" />
        <button
          type="submit"
          className="btn btn-primary"
          disabled={formik.isSubmitting || isLoading}
        >
          Create new work week
        </button>
      </div>
    </form>
  );
};

const TrackTime = () => {
  const workWeek = trpc.useQuery(["workweek.getWorkWeek"]);

  if (workWeek.isLoading) {
    return <div>Loading...</div>;
  }

  if (!workWeek.data?.workWeek) {
    return <CreateWorkWeek />;
  }

  return (
    <div>
      <div>
        <div className="text-2xl font-bold">
          Week: {workWeek.data.workWeek.weekNumber}
        </div>
        <div>
          <>
            Period: {workWeek.data.workWeek.startDate.toLocaleDateString()} -
            {workWeek.data.workWeek.endDate.toLocaleDateString()}
          </>
        </div>
      </div>
      <div className="sticky-top flex flex-col gap-2 py-8 bg-base-100 items-end lg:flex-row w-full">
        <div className="flex w-full flex-col gap-2 justify-end items-end lg:justify-start lg:flex-row">
          <div className="flex-1 w-full">
            <TextInput label="Description" placeholder="Work..." />
          </div>
          <AddTimeEntry workWeekId={workWeek.data.workWeek.id} />
        </div>
      </div>
      {workWeek.data.workWeek.WorkDay.length > 0 ? (
        <div className="flex flex-col gap-2">
          {workWeek.data.workWeek.WorkDay.map((day) => (
            <WorkDay key={day.id} day={day}>
              {day.WorkDayTimeEntry.map((timeEntry) => (
                <div className="pb-2" key={timeEntry.id}>
                  <WorkDayTimeEntry timeEntry={timeEntry} />
                </div>
              ))}
            </WorkDay>
          ))}
        </div>
      ) : (
        <div className="flex justify-center">
          <h3>no entires for this week</h3>
        </div>
      )}
    </div>
  );
};

export default TrackTime;

export const getServerSideProps = withAuthServerSideProps();
