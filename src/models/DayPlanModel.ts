export interface DayPlanModel {
  title: string;
  date: moment.Moment;
  from: string;
  to: string;
  description?: string;
}
