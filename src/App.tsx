import { useState } from "react";
// 3rd party
import moment, { Moment } from "moment";
// styles
import "antd/dist/antd.min.css";
import "./App.css";
// local
import RootLayout from "./components/RootLayout";
import Calendar from "./components/calendar/Calendar";
import CreateEventForm from "./components/create-event-form/CreateEventForm";
import PanelLayout from "./components/panel-layout/PanelLayout";
import { DayPlanModel } from "./models/DayPlanModel";
import { getDaysInMonth } from "./utils/dateUtils";

function App() {
  const [currentMonth] = useState(moment().startOf("month"));
  const [plans, setPlans] = useState(
    [...new Array(getDaysInMonth(currentMonth))].map(
      (_) => []
    ) as DayPlanModel[][]
  );

  const onCreateNewEventCb = (newEvent: DayPlanModel) => {
    if (
      currentMonth.month() !== newEvent.date.month() ||
      currentMonth.year() !== newEvent.date.year()
    ) {
      console.error("Not implemented feature");
      return;
    }
    const newPlansArray = [...plans];
    newPlansArray[newEvent.date.date() - 1].push(newEvent);
    setPlans(newPlansArray);
    setSideBarVisible(false);
  };

  const [selectedDate, setSelectedDate] = useState(moment());
  const onDateSelected = (date: Moment) => {
    setSelectedDate(date);
    setSelectedPlan(void 0);
    setSideBarVisible(true);
    setSidebarReadonly(false);
  };

  const [isSideBarVisible, setSideBarVisible] = useState(false);
  const onSidebarClose = () => {
    setSideBarVisible(false);
  };

  const [isSidebarReadonly, setSidebarReadonly] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(
    {} as DayPlanModel | undefined
  );
  const onPlanSelected = (plan: DayPlanModel) => {
    setSelectedPlan(plan);
    setSidebarReadonly(true);
    setSideBarVisible(true);
  };

  return (
    <RootLayout useFlex={true}>
      <PanelLayout>
        <Calendar
          plans={plans}
          showMonthName={true}
          currentMonth={currentMonth}
          onDaySelected={onDateSelected}
          onPlanSelected={onPlanSelected}
        />
      </PanelLayout>
      <PanelLayout visible={isSideBarVisible}>
        <CreateEventForm
          selectedDate={selectedDate}
          currentPlan={selectedPlan}
          isReadonly={isSidebarReadonly}
          setSelectedDate={setSelectedDate}
          onCreateNewEvent={onCreateNewEventCb}
          onCancel={onSidebarClose}
        />
      </PanelLayout>
    </RootLayout>
  );
}

export default App;
