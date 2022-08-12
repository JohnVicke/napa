export const getLastMondayFromDate = (date: Date) => {
  const monday = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() - date.getDay() + 1,
  );
  monday.setHours(date.getHours());
  return monday;
};

export const getNextSundayFromDate = (date: Date) => {
  const sunday = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() - date.getDay() + 7,
  );
  sunday.setHours(date.getHours());
  return sunday;
};

export const getWeeknumberFromDate = (date: Date) => {
  const janFirst = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor(
    (date.getTime() - janFirst.getTime()) / (24 * 60 * 60 * 1000),
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
export const getWeekdayString = (day: number) => days[day];

export const getElapsedHours = (start: Date, end: Date) => {
  const diff = end.getTime() - start.getTime();
  return Math.abs(Math.floor(diff / (1000 * 60 * 60)));
};

export const padStart = (num: number) => (num < 10 ? `0${num}` : `${num}`);

export const getLocaleISOString = ({
  date = new Date(),
  hours,
  minutes,
}: {
  date?: Date;
  hours?: number;
  minutes?: number;
}) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const h = hours || date.getHours();
  const m = minutes || date.getMinutes();

  return `${year}-${padStart(month)}-${padStart(day)}T${padStart(h)}:${padStart(
    m,
  )}`;
};

export const getTimeDifferenceString = (startTime: Date, endTime: Date) => {
  const diff = endTime.getTime() - startTime.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return `${padStart(hours)}:${padStart(minutes)}:${padStart(seconds)}`;
};
