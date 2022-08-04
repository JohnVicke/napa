import { trpc } from "@/utils/trpc";
import React from "react";
import { TextInput } from "../components/TextInput";
import { withAuthServerSideProps } from "../utils/withAuthServerSideProps";
import { inferQueryResponse } from "./api/trpc/[trpc]";
import { getWeekDayString } from "@/utils/date-helpers";
import { useElapsedTime } from "@/modules/track-time/useElapsedTime";
import { TrackTimeManually } from "@/modules/track-time/TrackTimeManually";
import { TrackTimeAutomatically } from "@/modules/track-time/TrackTimeAutomatically";

type WorkDay =
  inferQueryResponse<"workweek.getWorkWeek">["workWeek"]["WorkDay"][0];

type WorkDayTimeEntry = WorkDay["WorkDayTimeEntry"][0];

type WorkDayProps = {
  day: WorkDay;
};

type WorkDayTimeEntryProps = {
  timeEntry: WorkDayTimeEntry;
};

const WorkDay = ({ day, children }: React.PropsWithChildren<WorkDayProps>) => {
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

const TrackTime = () => {
  const {
    data: workWeekData,
    isLoading: workWeekLoading,
    error: workWeekError,
  } = trpc.useQuery(["workweek.getWorkWeek"]);
  const { mutate: startTimer } = trpc.useMutation(["workweek.startTimer"]);
  const { mutate: stopTimer } = trpc.useMutation(["workweek.stopTimer"]);
  const [editManually, setEditManually] = React.useState(false);

  const handleStartTimer = () =>
    !workWeekData?.hasTimerOn.timerOn ? startTimer() : () => {};

  const handleStopTimer = () =>
    workWeekData?.hasTimerOn
      ? stopTimer({ id: workWeekData.hasTimerOn.id })
      : () => {};

  return (
    <div>
      <div>
        <div className="text-2xl font-bold">
          Week: {workWeekData?.workWeek.weekNumber}
        </div>
        <div>
          <>
            Period: {workWeekData?.workWeek.startDate.toLocaleDateString()} -
            {workWeekData?.workWeek.endDate.toLocaleDateString()}
          </>
        </div>
      </div>
      <div className="sticky-top flex flex-col gap-2 py-8 bg-base-100 items-end lg:flex-row w-full">
        <div className="flex w-full flex-col gap-2 justify-end items-end lg:justify-start lg:flex-row">
          <div className="flex-1 w-full">
            <TextInput label="Description" placeholder="Work..." />
          </div>
          {!editManually ? (
            <TrackTimeAutomatically
              startTimer={handleStartTimer}
              stopTimer={handleStopTimer}
              timerOn={workWeekData?.hasTimerOn.timerOn}
              setEditType={() => setEditManually(true)}
            />
          ) : (
            <TrackTimeManually setEditType={() => setEditManually(false)} />
          )}
        </div>
      </div>
      {workWeekLoading && !workWeekData ? (
        <div className="flex justify-center">
          <div className="spinner" />
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {workWeekData?.workWeek.WorkDay.map((day) => (
            <WorkDay key={day.id} day={day}>
              {day.WorkDayTimeEntry.map((timeEntry) => (
                <div className="pb-2" key={timeEntry.id}>
                  <WorkDayTimeEntry timeEntry={timeEntry} />
                </div>
              ))}
            </WorkDay>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrackTime;

export const getServerSideProps = withAuthServerSideProps();
