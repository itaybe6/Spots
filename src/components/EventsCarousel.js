import React from "react";
import "../style/EventsCarousel.css";

const EventsCarousel = ({ events }) => {
  return (
    <div className="events-carousel-container">
      <div className="events-carousel">
        {events.map((event, index) => (
          <div className="event-card" key={index}>
            <img src={event.image} className="event-card-image" alt={event.title} />
            <div className="event-card-content">
              <div className="event-card-text">
                <h4 className="event-card-title">{event.title}</h4>
                <p className="event-card-date">{event.date} - {event.time}</p>
                <p className="event-card-location">{event.location}</p>
              </div>
              <button className="event-card-button">More Info</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsCarousel;
