import { isEmpty } from "./String";

/**
 * @returns {string} The current date in the format DD/MM/YYYY HH:MM:SS:MS
 */
export const getDayToMs = () => {
  // Return DD/MM/YYYY HH:MM:SS:MS
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const ms = date.getMilliseconds();
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}:${ms}`;
};

export const HHMMToDate = (str: string): Date => {
  if (isEmpty(str)) return null;
  let newDate = new Date();
  let splittedStr = str.split(":");
  newDate.setHours(parseInt(splittedStr[0]));
  newDate.setMinutes(parseInt(splittedStr[1]));

  return newDate;
};

export const YYYY_MONTH = (year?: number, month?: number): string => {
  let currentMonth = new Date().getMonth() + 1;
  let currentYear = new Date().getFullYear();
  if (year) currentYear = year;
  if (month) currentMonth = month;
  const strMonth = currentMonth < 10 ? `0${currentMonth}` : `${currentMonth}`;

  return `${currentYear} ${strMonth}`;
};

export const getCurrentSchoolYear = (): string => {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  let firstYear, secondYear;
  if (currentMonth < 9) {
    firstYear = currentYear - 1;
    secondYear = currentYear;
  } else {
    firstYear = currentYear;
    secondYear = currentYear + 1;
  }

  return `${firstYear}/${secondYear}`;
};

export const dateToHHMM = (date: Date): string => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let strHours = hours < 10 ? `0${hours}` : `${hours}`;
  let strMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  return `${strHours}:${strMinutes}`;
};

/**
 * Return true if the date are equal (Only considering the day, month and year)
 * @param date1
 * @param date2
 */
export const areDatesEqual = (date1: Date, date2: Date): boolean => {
  return (
    date1.getDate() == date2.getDate() &&
    date1.getMonth() == date2.getMonth() &&
    date1.getFullYear() == date2.getFullYear()
  );
};
