import React, { useState, useEffect } from "react";
import axios from "axios";

const FetchEvents = ({ setEvents }) => {
  const [loading, setLoading] = useState(true); // משתנה לעקוב אחר מצב הטעינה
  const [error, setError] = useState(null); // משתנה לאחסון שגיאות

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5001/user/events"); // קריאת GET לשרת
        setEvents(response.data); // עדכון האירועים עם התגובה מהשרת
        setLoading(false); // סיום הטעינה
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to fetch events");
        setLoading(false); // סיום הטעינה גם במקרה של שגיאה
      }
    };

    fetchEvents(); // קריאה לפונקציה
  }, []);

  // מציג הודעת טעינה אם המידע עדיין בטעינה
  if (loading) {
    return <div></div>;
  }

  // מציג הודעת שגיאה אם יש בעיה בטעינת המידע
  if (error) {
    return <div>{error}</div>;
  }

  // מחזיר את הרכיב EventsCarousel עם הנתונים
  return <div> </div>;
};

export default FetchEvents;
