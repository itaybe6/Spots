import React, { useState } from "react";
import "../style/AddEvent.css";

const AddEvent = ({ placeName , placeLocation }) => {
  const [formData, setFormData] = useState({
    eventType: "",
    title: "",
    description: "",
    link: "",
    image: null,
    date: "",
    startTime: "",
    endTime: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const eventData = {
      eventType: formData.eventType,
      placeName,
      eventTitle: formData.title,
      eventDescription: formData.description,
      dateTime: formData.date,
      image: formData.image ? formData.image.name : '',
      link: formData.link,
      placeLocation : JSON.stringify(placeLocation),
    };
  
    try {
      const response = await fetch('http://localhost:5001/user/add-event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        alert('Event added successfully');
        console.log(result);
      } else {
        alert('Failed to add event');
        console.error(result);
      }
    } catch (error) {
      console.error('Error adding event:', error);
      alert('An error occurred while adding the event');
    }
  };
  
  return (
    <div className="add-event-container">
      <h2 className="add-event-title">Add Event for {placeName}</h2>
      <form className="add-event-form" onSubmit={handleSubmit}>
        <div className="add-event-form-group">
          <label className="add-event-label" htmlFor="eventType">
            Event Type
          </label>
          <select
            id="eventType"
            name="eventType"
            value={formData.eventType}
            onChange={handleInputChange}
            className="add-event-select"
          >
            <option value="">Select</option>
            <option value="popup">Pop-up</option>
            <option value="concert">Concert</option>
            <option value="happy-hour">Happy Hour</option>
            <option value="sale">Sale</option>
            <option value="show">Show</option>
            <option value="party">Party</option>
          </select>
        </div>

        <div className="add-event-form-group">
          <label className="add-event-label" htmlFor="title">
            Event Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter event title"
            className="add-event-input"
          />
        </div>

        <div className="add-event-form-group">
          <label className="add-event-label" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter event description"
            className="add-event-textarea"
          />
        </div>

        <div className="add-event-form-group">
          <label className="add-event-label" htmlFor="link">
            Event Link (Optional)
          </label>
          <input
            type="url"
            id="link"
            name="link"
            value={formData.link}
            onChange={handleInputChange}
            placeholder="Enter link"
            className="add-event-input"
          />
        </div>

        <div className="add-event-form-group">
          <label className="add-event-label" htmlFor="date">
            Event Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            className="add-event-input"
          />
        </div>

        <div className="add-event-form-group">
          <label className="add-event-label" htmlFor="startTime">
            Start Time
          </label>
          <input
            type="time"
            id="startTime"
            name="startTime"
            value={formData.startTime}
            onChange={handleInputChange}
            className="add-event-input"
          />
        </div>

        <div className="add-event-form-group">
          <label className="add-event-label" htmlFor="endTime">
            End Time
          </label>
          <input
            type="time"
            id="endTime"
            name="endTime"
            value={formData.endTime}
            onChange={handleInputChange}
            className="add-event-input"
          />
        </div>

        <div className="add-event-form-group">
          <label className="add-event-label" htmlFor="image">
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="add-event-input"
          />
        </div>

        <button type="submit" className="add-event-submit-btn" onClick={handleSubmit}>
          Submit Event
        </button>
      </form>
    </div>
  );
};

export default AddEvent;
