import React from "react";
import "../style/EventDetails.css";

const EventDetails = ({ event }) => {
    return (
        <div className="event-details-card">
            <div className="event-image-container">
                {event.image && <img
                    src={`data:image/jpeg;base64,${event.image}`}
                    alt={event.eventTitle}
                    className="event-image"
                />}
                <div className="event-title-overlay">
                    <h2>{event.eventTitle}</h2>
                </div>
            </div>
            <div className="event-details">
                <p className="event-type">
                    <strong>Type:</strong> {event.eventType}
                </p>
                <p className="event-date">
                    <strong>Date:</strong> {new Date(event.dateTime).toLocaleDateString()}
                </p>
                <p className="event-location">
                    <strong>Location:</strong> {event.placeName}
                </p>
                <button
                    className="cta-button"
                    onClick={() => alert("Event added to your calendar!")}
                >
                    Add to Calendar
                </button>
            </div>
        </div>
    );
};

export default EventDetails;

