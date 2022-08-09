import { useEffect, useState } from "react";
import { getTimeDifferenceString } from "@/utils/date-helpers";

export const useElapsedTime = (startTime?: Date, endTime?: Date | null) => {
  const initialState =
    startTime && endTime ? getTimeDifferenceString(startTime, endTime) : "";

  const [timeElapsed, setTimeElapsed] = useState(initialState);

  useEffect(() => {
    if (!startTime || endTime) return;

    const intervalId = setInterval(() => {
      setTimeElapsed(
        getTimeDifferenceString(startTime as Date, endTime || new Date())
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, [endTime, startTime]);

  return timeElapsed;
};
