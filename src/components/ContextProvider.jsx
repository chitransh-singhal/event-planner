import React, { createContext, useState } from "react";

export const EventContext = createContext();

export const EventContextProvider = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem("events");
    return savedEvents ? JSON.parse(savedEvents) : {};
  });

  const addEvent = (eventData) => {
    const dateKey = selectedDate.toDateString();
    const newEvent = {
      id: Date.now(),
      title: eventData.title,
      color: eventData.color,
      hour: eventData.hour,
    };
    setEvents((prevEvents) => ({
      ...prevEvents,
      [dateKey]: [...(prevEvents[dateKey] || []), newEvent],
    }));
  };

  const updateEvent = (eventId, eventData) => {
    const dateKey = selectedDate.toDateString();
    setEvents((prevEvents) => ({
      ...prevEvents,
      [dateKey]: prevEvents[dateKey].map((event) =>
        event.id === eventId
          ? {
              ...event,
              title: eventData.title,
              color: eventData.color,
              hour: eventData.hour,
            }
          : event
      ),
    }));
  };

  return (
    <EventContext.Provider
      value={{ events, addEvent, updateEvent, setSelectedDate, selectedDate, setEvents }}
    >
      {children}
    </EventContext.Provider>
  );
};
