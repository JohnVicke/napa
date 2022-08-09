import { trpc } from "@/utils/trpc";
import React from "react";
import { TrackTimeAutomatically } from "./TrackTimeAutomatically";
import { TrackTimeManually } from "./TrackTimeManually";

type AddTimeEntryProps = {
  workWeekId: number;
};

export const AddTimeEntry = ({ workWeekId }: AddTimeEntryProps) => {
  const [editManually, setEditManually] = React.useState(false);

  const timer = trpc.useQuery(["timer.getTimer"]);

  const { setQueryData, getQueryData } = trpc.useContext();

  const startTimer = trpc.useMutation(["timer.startTimer"], {
    onSuccess: ({ startTime }) => {
      if (timer.data) {
        setQueryData(["timer.getTimer"], { ...timer.data, on: true });
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

  if (editManually) {
    return <TrackTimeManually setEditType={() => setEditManually(false)} />;
  }

  return (
    <TrackTimeAutomatically
      startTimer={handleStart}
      stopTimer={handleStop}
      timerOn={!!timer.data?.on}
      setEditType={() => setEditManually(true)}
    />
  );
};
