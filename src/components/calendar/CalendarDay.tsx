import { useCallback } from "react";
// 3rd party
import { Moment } from "moment";
import classes from "classnames";
// local
import { DayPlanModel } from "../../models/DayPlanModel";

interface ICalendarDayProps {
  date: Moment;
  plans: DayPlanModel[];
  onClick?: (date: Moment) => void;
  onPlanSelected?: (plan: DayPlanModel) => void;
}

export default function CalendarDay(props: ICalendarDayProps) {
  const hasOnClickEvent = !!props.onClick;
  const onClickEvent = useCallback(
    (_: any) => {
      if (hasOnClickEvent && props.onClick) {
        props.onClick(props.date);
      }
    },
    [hasOnClickEvent, props]
  );

  const onPlanClicked = (event: React.MouseEvent, plan: DayPlanModel) => {
    if (props.onPlanSelected) {
      event.stopPropagation();
      props.onPlanSelected(plan);
    }
  };

  return (
    <div
      className={classes("calendar-day", hasOnClickEvent ? "clickable" : "")}
      onClick={onClickEvent}
    >
      <p className="title">{props.date.date()}</p>
      {props.plans?.length > 0 &&
        props.plans.map((plan, i) => (
          <div
            className="plan"
            key={`${plan.title}_${i}`}
            onClick={(e) => onPlanClicked(e, plan)}
          >
            {plan.title}
          </div>
        ))}
    </div>
  );
}
