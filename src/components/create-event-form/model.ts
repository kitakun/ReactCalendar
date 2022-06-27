import { Moment } from "moment";

export interface CreateEventFormData {
  title: string;
  date: Moment;
  from: Moment;
  to: Moment;
  description?: string;
}
