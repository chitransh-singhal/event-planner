import React, { useState, useEffect, useContext } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import EventForm from "./EventForm";
import EventDetailsModal from "./EventDetailsModal";
import DayView from "./DayView";
import WeekView from "./WeekView";
import Chip from "@mui/material/Chip";
import { EventContext } from "./ContextProvider";

import "./styles.css";

const MyCalendar = () => {
  const { events, setSelectedDate, selectedDate, setEvents } = useContext(EventContext);

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [eventToEdit, setEventToEdit] = useState(null);
  const [eventToView, setEventToView] = useState(null);
  const [viewMode, setViewMode] = useState("month"); // 'month', 'day', 'week'

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const handleDayClick = (date) => {
    setSelectedDate(date);
    setIsPopupVisible(true);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
    setEventToEdit(null);
  };

  const deleteEvent = (eventId) => {
    const dateKey = selectedDate.toDateString();
    setEvents((prevEvents) => ({
      ...prevEvents,
      [dateKey]: prevEvents[dateKey].filter((event) => event.id !== eventId),
    }));
    setEventToView(null);
  };

  const handleEventClick = (event) => {
    setIsPopupVisible(false);
    setEventToView(event);
  };

  const renderTileContent = ({ date }) => {
    const dateKey = date.toDateString();
    return (
      <div>
        {(events[dateKey] || []).map((event) => (
          <>
            <Chip
              key={event.id}
              label={event.title}
              onClick={() => handleEventClick(event)}
              style={{
                background: event.color,
                color: "#fff",
                marginBottom: "2px",
              }}
            />
          </>
        ))}
      </div>
    );
  };

  const renderView = () => {
    if (viewMode === "month") {
      return (
        <Calendar onClickDay={handleDayClick} tileContent={renderTileContent} />
      );
    } else if (viewMode === "day") {
      return <DayView onDeleteEvent={deleteEvent} />;
    } else if (viewMode === "week") {
      return <WeekView onDeleteEvent={deleteEvent} />;
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>React Calendar with Day & Week View</h1>
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setViewMode("month")} style={buttonStyles.view}>
          Month View
        </button>
        <button onClick={() => setViewMode("day")} style={buttonStyles.view}>
          Day View
        </button>
        <button onClick={() => setViewMode("week")} style={buttonStyles.view}>
          Week View
        </button>
      </div>
      {renderView()}
      {isPopupVisible && (
        <EventForm onClose={closePopup} eventToEdit={eventToEdit} />
      )}
      {eventToView && (
        <EventDetailsModal
          event={eventToView}
          onClose={() => {
            setEventToView(null);
            setIsPopupVisible(false);
          }}
          onEdit={() => {
            setEventToEdit(eventToView);
            setIsPopupVisible(true);
            setEventToView(null);
          }}
          onDelete={() => deleteEvent(eventToView.id)}
        />
      )}
    </div>
  );
};

const buttonStyles = {
  view: {
    margin: "5px",
    padding: "10px",
    backgroundColor: "#2196F3",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  details: {
    marginLeft: "10px",
    padding: "5px",
    backgroundColor: "#FFC107",
    color: "black",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};
export default MyCalendar;
