import { TextInput } from "@/components/TextInput";
import { trpc } from "@/utils/trpc";
import React from "react";
import { TrackTimeAutomatically } from "./TrackTimeAutomatically";
import { TrackTimeManually } from "./TrackTimeManually";
import { useElapsedTime } from "./useElapsedTime";

type AddTimeEntryProps = {
  workWeekId: number;
};

export const AddTimeEntry = ({ workWeekId }: AddTimeEntryProps) => {
  const [editManually, setEditManually] = React.useState(false);
  const timer = trpc.useQuery(["timer.getTimer"]);

  const elapsedTime = useElapsedTime(timer.data?.startTime);

  const { setQueryData, getQueryData } = trpc.useContext();

  const startTimer = trpc.useMutation(["timer.startTimer"], {
    onSuccess: (data) => {
      if (data) {
        setQueryData(["timer.getTimer"], { ...data });
      }
    },
  });

  const stopTimer = trpc.useMutation(["timer.stopTimer"], {
    onSuccess: (day) => {
      if (timer.data) {
        setQueryData(["timer.getTimer"], { ...timer.data, on: false });
      }
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
      }
    },
  });

  const handleStart = () => {
    startTimer.mutate();
  };

  const handleStop = () => {
    stopTimer.mutate({ workWeekId });
  };

  return (
    <div className="sticky-top flex flex-col gap-2 py-8 bg-base-100 items-end lg:flex-row w-full">
      <div className="flex w-full flex-col gap-2 justify-end items-end lg:justify-start lg:flex-row">
        {timer.data?.on ? (
          <div className="flex-1 w-full">{elapsedTime}</div>
        ) : (
          <div className="flex-1 w-full">
            <TextInput label="Description" placeholder="Work..." />
          </div>
        )}
        {editManually ? (
          <TrackTimeManually setEditType={() => setEditManually(false)} />
        ) : (
          <TrackTimeAutomatically
            startTimer={handleStart}
            stopTimer={handleStop}
            timerOn={!!timer.data?.on}
            setEditType={() => setEditManually(true)}
          />
        )}
      </div>
    </div>
  );
};
