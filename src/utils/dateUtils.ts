import moment, { Moment } from "moment";

export function getDaysInMonth(date: Moment): number {
  return date.daysInMonth();
}

export function getMonthStartOffset(date: moment.Moment): number {
  return date.day() - 1;
}

export function getDaysTillEndOfWeek(date: moment.Moment): number {
  return 7 - date.weekday();
}
