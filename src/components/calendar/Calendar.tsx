import { useMemo } from "react";
// 3rd party
import moment, { Moment } from "moment";
// styles
import "./Calendar.scss";
// local
import {
  getDaysInMonth,
  getDaysTillEndOfWeek,
  getMonthStartOffset,
} from "../../utils/dateUtils";
import { DayPlanModel } from "../../models/DayPlanModel";
import CalendarDay from "./CalendarDay";
import EmptyDay from "./EmptyDay";

interface ICalendarProps {
  plans: DayPlanModel[][];
  showMonthName?: boolean;
  currentMonth?: Moment;
  onDaySelected?: (date: Moment) => void;
  onPlanSelected?: (plan: DayPlanModel) => void;
}

export default function Calendar(props: ICalendarProps) {
  const date = props.currentMonth ?? moment();
  const daysInMonth = getDaysInMonth(date);
  const startOfMonth = date.startOf("month");
  const dayOffset = getMonthStartOffset(startOfMonth);
  const daysTillMonthEnd = getDaysTillEndOfWeek(startOfMonth.endOf("month"));

  const prefixDays = useMemo(
    () =>
      [...Array(dayOffset)].map((_, index) => (
        <EmptyDay key={index} />
      )) as JSX.Element[],
    [dayOffset]
  );

  const postfixDays = useMemo(
    () =>
      [...Array(daysTillMonthEnd)].map((_, index) => (
        <EmptyDay key={index} />
      )) as JSX.Element[],
    [daysTillMonthEnd]
  );

  const dates = useMemo(
    () =>
      [...Array(daysInMonth)].map((_, index) => {
        let currentDate = startOfMonth
          .clone()
          .startOf("month")
          .add(index, "days");

        return {
          date: currentDate,
          dateKey: currentDate.format("yyyy-MM-DD"),
          plans: props.plans[index],
        };
      }),
    [daysInMonth, startOfMonth, props.plans]
  );

  return (
    <div className="calendar-content">
      {props.showMonthName && (
        <div className="calendar-title">{startOfMonth.format("MMMM")}</div>
      )}
      <div className="calendar-layout">
        {dayOffset > 0 && prefixDays}
        {dates.map((data) => (
          <CalendarDay
            key={data.date.unix()}
            date={data.date}
            plans={data.plans}
            onClick={props.onDaySelected}
            onPlanSelected={props.onPlanSelected}
          />
        ))}
        {postfixDays.length > 0 && postfixDays}
      </div>
    </div>
  );
}
