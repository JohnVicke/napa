import React from "react";
import { TextInput } from "@/components/TextInput";
import { Icon } from "@/components/icon/Icon";
import { useToastStore } from "../toast/toastStore";

export const TrackTimeManually = ({
  setEditType,
}: {
  setEditType: () => void;
}) => {
  const { addToast } = useToastStore();
  return (
    <>
      <div className="flex gap-2 w-full lg:w-[unset]">
        <TextInput label="From" type="time" placeholder="08:00" />
        <TextInput label="To" type="time" placeholder="17:00" />
      </div>
      <div className="flex gap-2">
        <button
          className="btn btn-primary"
          onClick={() => addToast({ message: "lol" })}
        >
          <Icon icon="ri-save-fill" className="font-normal mr-2" />
          Save
        </button>
        <button className="btn btn-outline" onClick={setEditType}>
          <Icon icon="ri-time-fill" className="font-normal mr-2" />
          Use timer
        </button>
      </div>
    </>
  );
};
