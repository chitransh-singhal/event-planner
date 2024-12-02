import React, { useState } from 'react';

const DayView = ({ date, events, onUpdateEvent, onDeleteEvent }) => {
  const dateKey = date.toDateString();
  const dayEvents = events[dateKey] || [];
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

  const renderTimeline = () => {
    const hours = Array.from({ length: 24 }, (_, i) => i);
    return hours.map((hour) => {
      const hourEvents = dayEvents.filter((event) => event.hour === hour);
      return (
        <div key={hour} style={styles.timeSlot}>
          <div style={styles.hourLabel}>{`${hour}:00`}</div>
          <div style={styles.events}>
            {hourEvents.map((event) =>
              editingEventId === event.id ? (
                <div key={event.id} style={styles.editEventContainer}>
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
                  <select
                    value={editedEvent.hour}
                    onChange={(e) =>
                      setEditedEvent((prev) => ({
                        ...prev,
                        hour: parseInt(e.target.value),
                      }))
                    }
                  >
                    {hours.map((h) => (
                      <option key={h} value={h}>
                        {`${h}:00`}
                      </option>
                    ))}
                  </select>
                  <button onClick={handleSave}>Save</button>
                  <button onClick={handleCancel}>Cancel</button>
                </div>
              ) : (
                <div key={event.id} style={{ ...styles.event, backgroundColor: event.color }}>
                  {event.title}
                  <button onClick={() => handleEdit(event)}>Edit</button>
                  <button onClick={() => onDeleteEvent(event.id)}>Delete</button>
                </div>
              )
            )}
          </div>
        </div>
      );
    });
  };

  return (
    <div style={styles.container}>
      <h2>Day View: {date.toDateString()}</h2>
      <div style={styles.timeline}>{renderTimeline()}</div>
    </div>
  );
};

const styles = {
  container: {
    margin: '20px',
    padding: '10px',
    textAlign: 'left',
  },
  timeline: {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid #ddd',
    borderRadius: '5px',
  },
  timeSlot: {
    display: 'flex',
    padding: '5px',
    borderBottom: '1px solid #eee',
  },
  hourLabel: {
    width: '60px',
    fontWeight: 'bold',
  },
  events: {
    flex: 1,
    display: 'flex',
    flexWrap: 'wrap',
    gap: '5px',
  },
  event: {
    padding: '5px',
    borderRadius: '3px',
    color: '#fff',
    position: 'relative',
  },
  editEventContainer: {
    display: 'flex',
    gap: '5px',
  },
};

export default DayView;