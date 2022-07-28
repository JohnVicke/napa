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
