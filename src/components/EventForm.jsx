import React, { useState, useEffect } from 'react';

const EventForm = ({ selectedDate, onClose, onAddEvent, eventToEdit, onUpdateEvent }) => {
  const [eventTitle, setEventTitle] = useState('');
//   const [eventColor, setEventColor] = useState('#000000'); // Default black color

//   useEffect(() => {
//     if (eventToEdit) {
//       setEventTitle(eventToEdit.title);
//       setEventColor(eventToEdit.color || '#000000');
//     } else {
//       setEventTitle('');
//       setEventColor('#000000');
//     }
//   }, [eventToEdit]);

  const handleSubmit = () => {
    if (!eventTitle.trim()) {
      alert('Event title cannot be empty.');
      return;
    }

    // const eventData = { title: eventTitle, color: eventColor };

    if (eventToEdit) {
      onUpdateEvent(eventToEdit.id, eventTitle);
    } else {
      onAddEvent(eventTitle);
    }

    setEventTitle('');
    // setEventColor('#000000');
    onClose();
  };

  return (
    <div style={popupStyles.overlay}>
      <div style={popupStyles.popup}>
        <h2>{eventToEdit ? 'Edit Event' : 'Add Event'}</h2>
        <p>Date: {selectedDate?.toDateString()}</p>
        <form onSubmit={(e) => e.preventDefault()}>
          <label>
            Event Title:
            <input
              type="text"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              placeholder="Enter event title"
            />
          </label>
          <br />
          {/* <label>
            Event Color:
            <input
              type="color"
              value={eventColor}
              onChange={(e) => setEventColor(e.target.value)}
            />
          </label> */}
          <br />
          <button type="button" onClick={handleSubmit}>
            {eventToEdit ? 'Update Event' : 'Add Event'}
          </button>
          <button type="button" onClick={onClose} style={{ marginLeft: '10px' }}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

const popupStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    width: '300px',
    textAlign: 'center',
  },
};

export default EventForm;
