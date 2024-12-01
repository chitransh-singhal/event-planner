import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import EventForm from './EventForm';
import EventDetailsModal from './EventDetailsModal';

const MyCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem('events');
    return savedEvents ? JSON.parse(savedEvents) : {};
  });
  const [eventToEdit, setEventToEdit] = useState(null);
  const [eventToView, setEventToView] = useState(null);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const handleDayClick = (date) => {
    setSelectedDate(date);
    setIsPopupVisible(true);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
    setEventToEdit(null);
  };

  const addEvent = (eventData) => {
    const dateKey = selectedDate.toDateString();
    const newEvent = { id: Date.now(), title: eventData.title, color: eventData.color };
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
        event.id === eventId ? { ...event, title: eventData.title, color: eventData.color } : event
      ),
    }));
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
    setEventToView(event);
  };

  const renderTileContent = ({ date }) => {
    const dateKey = date.toDateString();
    return (
      <div>
        {(events[dateKey] || []).map((event) => (
          <div
            key={event.id}
            style={{
              fontSize: '0.8em',
              background: event.color,
              color: '#fff',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
            onClick={() => handleEventClick(event)}
          >
            {event.title}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>React Calendar with Event Details</h1>
      <Calendar onClickDay={handleDayClick} tileContent={renderTileContent} />
      {isPopupVisible && (
        <EventForm
          selectedDate={selectedDate}
          onClose={closePopup}
          onAddEvent={addEvent}
          eventToEdit={eventToEdit}
          onUpdateEvent={updateEvent}
        />
      )}
      {eventToView && (
        <EventDetailsModal
          event={eventToView}
          onClose={() => setEventToView(null)}
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

export default MyCalendar;