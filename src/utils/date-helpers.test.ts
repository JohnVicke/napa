import {
  getWeekdayString,
  getLastMondayFromDate,
  getNextSundayFromDate,
  getWeeknumberFromDate,
  getElapsedHours,
  padStart,
  getLocaleISOString,
  getTimeDifferenceString,
} from "./date-helpers";

describe("date-helpers", () => {
  describe("getWeekNumberFromDate", () => {
    it("should return the week number of the given date", () => {
      const date = new Date("2022-01-10");
      expect(getWeeknumberFromDate(date)).toBe(1);
    });
  });
  describe("getLastMondayFromDate", () => {
    it("should return last monday from date", () => {
      const date = new Date("2022-08-12");
      const lastMonday = new Date("2022-08-08");
      expect(getLastMondayFromDate(date)).toStrictEqual(lastMonday);
    });
  });
  describe("getNextSundayFromDate", () => {
    it("should return next sunday from date", () => {
      const date = new Date("2022-08-12");
      const nextSunday = new Date("2022-08-14");
      expect(getNextSundayFromDate(date)).toStrictEqual(nextSunday);
    });
  });
  describe("getWeekdayString", () => {
    it("should return the weekday string of the given day", () => {
      expect(getWeekdayString(0)).toBe("Sunday");
      expect(getWeekdayString(1)).toBe("Monday");
      expect(getWeekdayString(2)).toBe("Tuesday");
      expect(getWeekdayString(3)).toBe("Wednesday");
      expect(getWeekdayString(4)).toBe("Thursday");
      expect(getWeekdayString(5)).toBe("Friday");
      expect(getWeekdayString(6)).toBe("Saturday");
    });
  });
  describe("getElapsedHours", () => {
    it("should return difference in time between two dates", () => {
      const start = new Date("2022-01-10");
      const end = new Date("2022-01-11");
      expect(getElapsedHours(start, end)).toBe(24);
    });
  });
  describe("padStart", () => {
    it("should return a string with leading zeros if it is less than 10", () => {
      expect(padStart(1)).toBe("01");
    });
    it("should return the string if it is greater than 10", () => {
      expect(padStart(11)).toBe("11");
    });
  });
  describe("getLocaleISOString", () => {
    it("should return a string in the format YYYY-MM-DDTHH:MM", () => {
      const date = new Date("2022-01-10:10:10");
      expect(getLocaleISOString({ date })).toBe("2022-01-10T10:10");
    });
  });
  describe("getTimeDifferenceString", () => {
    it("should return a string in the format HH:MM:SS", () => {
      const start = new Date("2022-01-10:10:10");
      const end = new Date("2022-01-10:11:10");
      expect(getTimeDifferenceString(start, end)).toBe("01:00:00");
    });
  });
});
