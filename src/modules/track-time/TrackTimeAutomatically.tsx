import { Icon } from "@/components/icon/Icon";
import React from "react";

type TrackTimeAutomaticallyProps = {
  timerOn?: boolean;
  startTimer: () => void;
  stopTimer: () => void;
  setEditType: () => void;
  startTime?: Date;
};
export const TrackTimeAutomatically = ({
  timerOn,
  startTimer,
  stopTimer,
  setEditType,
  startTime,
}: TrackTimeAutomaticallyProps) => (
  <div className="flex gap-2">
    <button
      className={`btn ${timerOn ? "btn-error" : "btn-primary"}`}
      onClick={timerOn ? stopTimer : startTimer}
    >
      <Icon icon="ri-play-fill" className="font-normal mr-2" />
      {`${timerOn ? "Stop" : "Start"}`} timer
    </button>
    <button className="btn btn-outline" onClick={setEditType}>
      <Icon icon="ri-edit-2-fill" className="font-normal mr-2" />
      Manually
    </button>
  </div>
);
