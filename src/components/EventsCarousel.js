import React, { useState,useEffect } from "react";
import AddEvent from "./AddEvents";
import "../style/EventsCarousel.css";

const EventsCarousel = ({ events, placeName }) => {
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [isUser, setIsUser] = useState(false);

  const handleAddEventClick = () => {
    setShowAddEvent(true); // מציג את רכיב AddEvent
  };

  const handleCloseAddEvent = () => {
    setShowAddEvent(false); // מסתיר את רכיב AddEvent
  };



 // בדיקה אם התחבר בתור בעל עסק ורק אם כן יש לו את האפשרות להוסיף אירוע חדש 
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
       setIsUser(true)
       console.log(token)
      } catch (error) {
        console.error('Invalid token:', error);
      }
    }
  }, []);



  return (
    <div className="events-carousel-container">
      <div className="events-carousel">


        {isUser && <div className="event-card add-event-card" onClick={handleAddEventClick}>
          <div className="add-event-content">
            <span className="add-event-icon">+</span>
            <p className="add-event-text">Add Event</p>
          </div>
        </div> }
        

        {/* מציג את האירועים */}
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

      {/* מציג את רכיב AddEvent אם המשתמש לחץ על כפתור ההוספה */}
      {showAddEvent && (
        <div className="add-event-modal">
          <AddEvent placeName={placeName} />
          <button className="close-add-event" onClick={handleCloseAddEvent}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default EventsCarousel;
