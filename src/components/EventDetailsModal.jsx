import React from 'react';

const EventDetailsModal = ({ event, onClose, onEdit, onDelete }) => {
  if (!event) return null;

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.modal}>
        <h2>Event Details</h2>
        <p>
          <strong>Title:</strong> {event.title}
        </p>
        <p>
          <strong>Color:</strong>{' '}
          <span
            style={{
              display: 'inline-block',
              width: '20px',
              height: '20px',
              backgroundColor: event.color,
              borderRadius: '50%',
              verticalAlign: 'middle',
            }}
          ></span>
        </p>
        <button onClick={onEdit} style={buttonStyles.edit}>
          Edit
        </button>
        <button onClick={onDelete} style={buttonStyles.delete}>
          Delete
        </button>
        <button onClick={onClose} style={buttonStyles.close}>
          Close
        </button>
      </div>
    </div>
  );
};

const modalStyles = {
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
  modal: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    width: '300px',
    textAlign: 'center',
  },
};

const buttonStyles = {
  edit: {
    margin: '5px',
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  delete: {
    margin: '5px',
    padding: '10px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  close: {
    margin: '5px',
    padding: '10px',
    backgroundColor: '#777',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default EventDetailsModal;