import React from "react";
import { TextInput } from "../components/TextInput";

const TrackTime = () => {
  const [editManually, setEditManually] = React.useState(false);

  return (
    <div>
      <div className="sticky-top flex flex-col gap-2 py-2 bg-base-100 items-end lg:flex-row w-full">
        <div className="flex w-full flex-col gap-2 justify-end items-end lg:justify-start lg:flex-row">
          <div className="flex-1 w-full">
            <TextInput label="Description" placeholder="Work..." />
          </div>
          {!editManually ? (
            <div className="flex gap-2">
              <button className="btn btn-primary">
                <i className="ri-play-fill font-normal mr-2 " />
                Start timer
              </button>
              <button
                className="btn btn-outline"
                onClick={() => setEditManually(true)}
              >
                <i className="ri-edit-2-fill font-normal mr-2" />
                Manually
              </button>
            </div>
          ) : (
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
                <button
                  className="btn btn-outline"
                  onClick={() => setEditManually(false)}
                >
                  <i className="ri-time-fill font-normal mr-2" />
                  Use timer
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="h-96">ashdf</div>
      <div className="h-96">ashdf</div>
      <div className="h-96">ashdf</div>
      <div className="h-96">ashdf</div>
    </div>
  );
};

export default TrackTime;
