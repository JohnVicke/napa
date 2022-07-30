import React from "react";

type TrackTimeAutomaticallyProps = {
  timerOn?: boolean;
  startTimer: () => void;
  stopTimer: () => void;
  setEditType: () => void;
};
export const TrackTimeAutomatically = ({
  timerOn,
  startTimer,
  stopTimer,
  setEditType,
}: TrackTimeAutomaticallyProps) => {
  return (
    <div className="flex gap-2">
      <button
        className={`btn ${timerOn ? "btn-error" : "btn-primary"}`}
        onClick={timerOn ? stopTimer : startTimer}
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
