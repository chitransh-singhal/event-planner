import React, { useState } from 'react';

const WeekView = ({ date, events, onUpdateEvent, onDeleteEvent }) => {
  const startOfWeek = new Date(date);
  startOfWeek.setDate(date.getDate() - date.getDay());

  const days = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    return day;
  });

  const [editingEventId, setEditingEventId] = useState(null);
  const [editedEvent, setEditedEvent] = useState(null);

  const handleEdit = (event) => {
    setEditingEventId(event.id);
    setEditedEvent({ ...event });
  };

  const handleSave = () => {
    onUpdateEvent(editingEventId, editedEvent);
    setEditingEventId(null);
    setEditedEvent(null);
  };

  const handleCancel = () => {
    setEditingEventId(null);
    setEditedEvent(null);
  };

  const renderWeek = () => {
    return days.map((day) => {
      const dateKey = day.toDateString();
      const dayEvents = events[dateKey] || [];
      return (
        <div key={dateKey} style={styles.dayColumn}>
          <h4 style={styles.dayTitle}>{day.toDateString()}</h4>
          <ul>
            {dayEvents.map((event) =>
              editingEventId === event.id ? (
                <li key={event.id} style={styles.editEventContainer}>
                  <input
                    type="text"
                    value={editedEvent.title}
                    onChange={(e) =>
                      setEditedEvent((prev) => ({ ...prev, title: e.target.value }))
                    }
                  />
                  <input
                    type="color"
                    value={editedEvent.color}
                    onChange={(e) =>
                      setEditedEvent((prev) => ({ ...prev, color: e.target.value }))
                    }
                  />
                  <button onClick={handleSave}>Save</button>
                  <button onClick={handleCancel}>Cancel</button>
                </li>
              ) : (
                <li key={event.id} style={{ ...styles.event, backgroundColor: event.color }}>
                  {event.title}
                  <button onClick={() => handleEdit(event)}>Edit</button>
                  <button onClick={() => onDeleteEvent(event.id)}>Delete</button>
                </li>
              )
            )}
          </ul>
        </div>
      );
    });
  };

  return (
    <div style={styles.container}>
      <h2>Week View</h2>
      <div style={styles.weekGrid}>{renderWeek()}</div>
    </div>
  );
};

const styles = {
  container: {
    margin: '20px',
    padding: '10px',
    textAlign: 'left',
  },
  weekGrid: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  dayColumn: {
    flex: 1,
    margin: '0 5px',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
  },
  dayTitle: {
    fontSize: '1em',
    marginBottom: '10px',
  },
  event: {
    padding: '5px',
    marginBottom: '5px',
    borderRadius: '3px',
    color: '#fff',
  },
  editEventContainer: {
    display: 'flex',
    gap: '5px',
    alignItems: 'center',
  },
};

export default WeekView;