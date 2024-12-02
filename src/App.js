import React from "react";
import MyCalendar from "./components/MyCalendar";
import { EventContextProvider } from "./components/ContextProvider";

const App = () => {
  return (
    <div>
      <EventContextProvider>
        <MyCalendar />
      </EventContextProvider>
    </div>
  );
};

export default App;
