import { trpc } from "@/utils/trpc";
import React from "react";
import { TextInput } from "../components/TextInput";
import { withAuthServerSideProps } from "../utils/withAuthServerSideProps";

type TrackTimeAutomaticallyProps = {
  timerOn?: boolean;
  setEditType: () => void;
};

const TrackTimeAutomatically = ({
  timerOn,
  setEditType,
}: TrackTimeAutomaticallyProps) => {
  const { mutate, data, isLoading } = trpc.useMutation(["workweek.startTimer"]);

  const startTimer = () => {
    mutate();
  };

  return (
    <div className="flex gap-2">
      <button
        className={`btn btn-${timerOn ? "error" : "primary"}`}
        onClick={startTimer}
      >
        <i className="ri-play-fill font-normal mr-2 " />
        {`${timerOn ? "Stop" : "Start"}`} timer
      </button>
      <button className="btn btn-outline" onClick={setEditType}>
        <i className="ri-edit-2-fill font-normal mr-2" />
        Manually
      </button>
    </div>
  );
};

const TrackTimeManually = ({ setEditType }: { setEditType: () => void }) => {
  return (
    <>
      <div className="flex gap-2 w-full lg:w-[unset]">
        <TextInput label="From" type="time" placeholder="08:00" />
        <TextInput label="To" type="time" placeholder="17:00" />
      </div>
      <div className="flex gap-2">
        <button className="btn btn-primary">
          <i className="ri-save-fill font-normal mr-2" />
          Save
        </button>
        <button className="btn btn-outline" onClick={setEditType}>
          <i className="ri-time-fill font-normal mr-2" />
          Use timer
        </button>
      </div>
    </>
  );
};

const TrackTime = () => {
  const { data: workWeekData, isLoading: workWeekLoading } = trpc.useQuery([
    "workweek.getWorkWeek",
  ]);
  const [editManually, setEditManually] = React.useState(false);
  console.log(workWeekData);

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
              timerOn={workWeekData?.hasTimerOn}
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
          {workWeekData?.workWeek.WorkDay.map((day) => JSON.stringify(day))}
        </div>
      )}
    </div>
  );
};

export default TrackTime;

export const getServerSideProps = withAuthServerSideProps();
