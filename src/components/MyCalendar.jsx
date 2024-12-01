import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import EventForm from './EventForm';
import EventDetailsModal from './EventDetailsModal';

const MyCalendar = () => {
  // const [value, onChange] = useState(new Date());
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

  const addEvent = (eventTitle) => {
    const dateKey = selectedDate.toDateString();
    const newEvent = { id: Date.now(), title: eventTitle };
    setEvents((prevEvents) => ({
      ...prevEvents,
      [dateKey]: [...(prevEvents[dateKey] || []), newEvent],
    }));
  };

  const updateEvent = (eventId, updatedTitle) => {
    const dateKey = selectedDate.toDateString();
    setEvents((prevEvents) => ({
      ...prevEvents,
      [dateKey]: prevEvents[dateKey].map((event) =>
        event.id === eventId ? { ...event, title: updatedTitle } : event
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

  // const handleEditClick = (event) => {
  //   setEventToEdit(event);
  //   setIsPopupVisible(true);
  // };

  const renderTileContent = ({ date }) => {
    const dateKey = date.toDateString();
    return (
      <div>
        {(events[dateKey] || []).map((event) => (
          <div
            key={event.id}
            style={{
              fontSize: '0.8em',
              color: '#000',
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

  // const renderEventList = () => {
  //   const dateKey = selectedDate?.toDateString();
  //   const dayEvents = events[dateKey] || [];

  //   return (
  //     <ul>
  //       {dayEvents.map((event) => (
  //         <li key={event.id} style={{ marginBottom: '10px' }}>
  //           <span>{event.title}</span>
  //           <button onClick={() => handleEditClick(event)} style={buttonStyles.edit}>
  //             Edit
  //           </button>
  //           <button onClick={() => deleteEvent(event.id)} style={buttonStyles.delete}>
  //             Delete
  //           </button>
  //         </li>
  //       ))}
  //     </ul>
  //   );
  // };

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

// const buttonStyles = {
//   edit: {
//     marginLeft: '10px',
//     padding: '5px',
//     backgroundColor: '#4CAF50',
//     color: 'white',
//     border: 'none',
//     borderRadius: '5px',
//     cursor: 'pointer',
//   },
//   delete: {
//     marginLeft: '5px',
//     padding: '5px',
//     backgroundColor: '#f44336',
//     color: 'white',
//     border: 'none',
//     borderRadius: '5px',
//     cursor: 'pointer',
//   },
// };

export default MyCalendar;