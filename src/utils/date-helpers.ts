export const getCurrentWeekMonday = () => {
  const today = new Date();
  const monday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - today.getDay() + 1
  );
  return monday;
};

export const getCurrentWeekSunday = () => {
  const today = new Date();
  const sunday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - today.getDay() + 7
  );
  return sunday;
};

export const getCurrentWeekNumber = () => {
  const today = new Date();
  const janFirst = new Date(today.getFullYear(), 0, 1);
  const days = Math.floor(
    (today.getTime() - janFirst.getTime()) / (24 * 60 * 60 * 1000)
  );
  return Math.floor(days / 7);
};

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
export const getWeekDayString = (day: number) => days[day];

export const getElapsedHours = (start: Date, end: Date) => {
  const diff = start.getTime() - end.getTime();
  return Math.floor(diff / (1000 * 60 * 60));
};

const padStart = (num: number) => (num < 10 ? `0${num}` : num);

export const getTimeDifferenceString = (startTime: Date, endTime: Date) => {
  const diff = endTime.getTime() - startTime.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return `${padStart(hours)}:${padStart(minutes)}:${padStart(seconds)}`;
};
