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
  const weekNr = Math.floor(days / 7) + 1;
  return weekNr;
};
