import React from "react";
import { TextInput } from "../components/TextInput";

const TrackTime = () => {
  const [editManually, setEditManually] = React.useState(false);

  return (
    <div>
      <div className="sticky-top flex gap-4 py-2 bg-base-100 items-end">
        <TextInput
          label="Description"
          placeholder="Work..."
          className="w-full"
        />
        {!editManually ? (
          <>
            <button className="btn btn-primary">
              <i className="ri-play-fill font-normal mr-2" />
              Start timer
            </button>
            <button
              className="btn btn-outline"
              onClick={() => setEditManually(true)}
            >
              <i className="ri-edit-2-fill font-normal mr-2" />
              Enter manually
            </button>
          </>
        ) : (
          <>
            <TextInput label="from" type="time" value="08:00" />
            <TextInput label="to" type="time" value="17:00" />
            <button className="btn btn-primary">
              <i className="ri-save-fill font-normal mr-2" />
              Save
            </button>
            <button
              className="btn btn-outline"
              onClick={() => setEditManually(false)}
            >
              <i className="ri-time-fill font-normal mr-2" />
              Use timer
            </button>
          </>
        )}
      </div>
      <div className="h-96">ashdf</div>
      <div className="h-96">ashdf</div>
      <div className="h-96">ashdf</div>
      <div className="h-96">ashdf</div>
    </div>
  );
};

export default TrackTime;
