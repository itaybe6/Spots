import React, { useState, useEffect } from "react";
import axios from "axios";
import FetchPlaceDetails from "./FetchPlaceDetails";
import "../style/EventPopup.css";

const EventPopup = ({ event, onClose }) => {
  const [placeDetails, setPlaceDetails] = useState(null);
  const [morePlaceDetails, setMorePlaceDetails] = useState(null);

  const fetchPlaceById = async (placeName) => {
    try {
      const response = await axios.get(`http://localhost:5001/api/places/${placeName}`);
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error("Error fetching place details:", error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchPlaceDetails = async () => {
      try {
        const data = await fetchPlaceById(event.placeName); // שליפת נתוני המקום
        setPlaceDetails(data);
      } catch (error) {
        console.error("Error fetching place details:", error);
      }
    };

    fetchPlaceDetails(); // קריאה לפונקציה
  }, [event.placeName]);
  if (!event) return null; // אם אין אירוע, לא מציגים את החלון

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div
        className="popup-container"
        onClick={(e) => e.stopPropagation()} // מונע סגירה כשנלחץ בתוך החלון
      >
        <button className="popup-close-button" onClick={onClose}>
          X
        </button>
        <img
          src={`data:image/jpeg;base64,${event.image}`}
          alt={event.eventTitle}
          className="popup-image"
        />
       <div className="popup-content">
  <h2 className="popup-title">{event.eventTitle}</h2>
  <p className="popup-type">{event.eventType}</p>
  <p className="popup-date">{new Date(event.dateTime).toLocaleDateString()}</p>
  <p className="popup-location">{event.placeName}</p>
  <p className="popup-description">{event.eventDescription}</p>
  <div className="popup-info">
    <p className="popup-address">📍 Address: 123 Example St, Cityville</p>
    <a href="tel:+1234567890" className="popup-phone-button">
      📞 Call Now
    </a>
  </div>
</div>

      </div>

    </div>
  );
};

export default EventPopup;
