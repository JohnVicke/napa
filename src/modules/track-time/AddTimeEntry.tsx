import { TextInput } from "@/components/TextInput";
import { trpc } from "@/utils/trpc";
import React from "react";
import { TrackTimeAutomatically } from "./TrackTimeAutomatically";
import { AddTimeManually } from "./AddTimeManually";
import { useElapsedTime } from "./useElapsedTime";
import { useToastStore } from "../toast/toastStore";

const Timer = ({ startTime }: { startTime: Date }) => {
  const elapsedTime = useElapsedTime(startTime);
  return <div>{elapsedTime}</div>;
};

type AddTimeEntryProps = {
  workWeekId: number;
};

export const AddTimeEntry = ({ workWeekId }: AddTimeEntryProps) => {
  const [editManually, setEditManually] = React.useState(false);
  const { addToast } = useToastStore();
  const timer = trpc.useQuery(["timer.getTimer"]);
  const { setQueryData, getQueryData } = trpc.useContext();

  const startTimer = trpc.useMutation(["timer.startTimer"], {
    onSuccess: (data) => {
      if (data) {
        addToast({ message: "Started timer", type: "success" });
        setQueryData(["timer.getTimer"], { ...data });
      }
    },
  });

  const stopTimer = trpc.useMutation(["timer.stopTimer"], {
    onSuccess: (day) => {
      if (timer.data) {
        addToast({ message: "Stopped timer", type: "success" });
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

  //const addTimeEntry= trpc.useMutation([""]);

  const handleStart = () => {
    startTimer.mutate();
  };

  const handleStop = () => {
    stopTimer.mutate({ workWeekId });
  };

  return (
    <div className="sticky-top py-4 bg-base-100  lg:flex-row w-full">
      <div>
        {!!timer.data?.on && timer.data.startTime && (
          <Timer startTime={timer.data?.startTime} />
        )}
        {editManually ? (
          <AddTimeManually setEditType={() => setEditManually(false)} />
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
