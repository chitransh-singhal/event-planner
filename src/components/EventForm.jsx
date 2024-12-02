import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";

import "./styles.css";

const EventForm = ({
  selectedDate,
  onClose,
  onAddEvent,
  eventToEdit,
  onUpdateEvent,
}) => {
  const [eventTitle, setEventTitle] = useState("");
  const [eventColor, setEventColor] = useState("#000000"); // Default black color
  const [eventHour, setEventHour] = useState(0);

  useEffect(() => {
    if (eventToEdit) {
      setEventTitle(eventToEdit.title);
      setEventColor(eventToEdit.color || "#000000");
      setEventHour(eventToEdit.hour);
    } else {
      setEventTitle("");
      setEventColor("#000000");
      setEventHour(0);
    }
  }, [eventToEdit]);

  const handleSubmit = () => {
    if (!eventTitle.trim()) {
      alert("Event title cannot be empty.");
      return;
    }

    const eventData = { title: eventTitle, color: eventColor, hour: eventHour };

    if (eventToEdit) {
      onUpdateEvent(eventToEdit.id, eventData);
    } else {
      onAddEvent(eventData);
    }

    setEventTitle("");
    setEventColor("#000000");
    onClose();
  };

  return (
    <div className="add-edit-form">
      <div style={popupStyles.overlay}>
        <div style={popupStyles.popup}>
          <h2>{eventToEdit ? "Edit Event" : "Add Event"}</h2>
          <p>Date: {selectedDate?.toDateString()}</p>
          <form onSubmit={(e) => e.preventDefault()}>
            <label for="title">Event Title:</label>
            <input
              type="text"
              id="title"
              value={eventTitle}
              className="text-input"
              onChange={(e) => setEventTitle(e.target.value)}
              placeholder="Enter event title"
            />
            <br />
            <br />
            <label for="color">Event Color:</label>
            <input
              type="color"
              id="color"
              value={eventColor}
              className="color-input"
              onChange={(e) => setEventColor(e.target.value)}
            />
            <br />
            <br />
            <label>Hour:</label>
            <select
              value={eventHour}
              className="hour-select"
              onChange={(e) => setEventHour(parseInt(e.target.value))}
            >
              {Array.from({ length: 24 }, (_, i) => (
                <option key={i} value={i}>
                  {`${i}:00`}
                </option>
              ))}
            </select>
            <br />
            <br />
            <Button variant="contained" onClick={handleSubmit}>
              {eventToEdit ? "Update Event" : "Add Event"}
            </Button>
            <Button
              style={{ marginLeft: "10px" }}
              variant="outlined"
              onClick={onClose}
            >
              Cancel
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

const popupStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    width: "300px",
    textAlign: "center",
  },
};

export default EventForm;