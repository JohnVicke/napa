import React from "react";

interface NewWorkWeekModalProps {}

export const NewWorkWeekModal = ({}: NewWorkWeekModalProps) => {
  return (
    <>
      <label htmlFor="new-workweek-modal" className="btn modal-button">
        open modal
      </label>

      <input type="checkbox" id="new-workweek-modal" className="modal-toggle" />
      <label
        htmlFor="new-workweek-modal"
        className="modal modal-bottom cursor-pointer sm:modal-middle"
      >
        <label htmlFor="" className="modal-box">
          <div>hello world</div>
        </label>
      </label>
    </>
  );
};
