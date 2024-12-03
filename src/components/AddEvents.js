import React, { useState } from "react";
import "./AddEvent.css"; // הקובץ לעיצוב

const AddEvent = () => {
  const [formData, setFormData] = useState({
    eventType: "",
    title: "",
    description: "",
    link: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Event Data Submitted: ", formData);
    // כאן אפשר להוסיף קריאה ל-API או לוגיקה אחרת
  };

  return (
    <div className="add-event-container">
      <h2>Add Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="eventType">Choose Event Type</label>
          <select
            id="eventType"
            name="eventType"
            value={formData.eventType}
            onChange={handleInputChange}
          >
            <option value="">Select an event type</option>
            <option value="popup">Pop-up</option>
            <option value="concert">Concert</option>
            <option value="happy-hour">Happy Hour</option>
            <option value="sale">Sale</option>
            <option value="show">Show</option>
            <option value="party">Party</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="title">Event Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter event title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Event Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter event description"
          />
        </div>

        <div className="form-group">
          <label htmlFor="link">Event Link (Optional)</label>
          <input
            type="url"
            id="link"
            name="link"
            value={formData.link}
            onChange={handleInputChange}
            placeholder="Enter a link for more details"
          />
        </div>

        <button type="submit" className="submit-btn">
          Submit Event
        </button>
      </form>
    </div>
  );
};

export default AddEvent;
