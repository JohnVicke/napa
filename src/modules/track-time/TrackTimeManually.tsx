import React from "react";
import { TextInput } from "@/components/TextInput";

export const TrackTimeManually = ({
  setEditType,
}: {
  setEditType: () => void;
}) => {
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
