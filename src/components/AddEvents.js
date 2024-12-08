import React, { useState } from "react";
import "../style/AddEvent.css";
import axios from 'axios';

const AddEvent = ({ placeName, placeLocation }) => {
  const [formData, setFormData] = useState({
    eventType: "",
    title: "",
    description: "",
    link: "",
    image: null,
    date: "",
    time: "",
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

    const Data = new FormData();
    Data.append("eventType", formData.eventType);
    Data.append("placeName", placeName);
    Data.append("eventTitle", formData.title);
    Data.append("eventDescription", formData.description);
    Data.append("dateTime", `${formData.date}T${formData.time}`);
    Data.append("image", formData.image ? formData.image : "");
    Data.append("link", formData.link);
    Data.append("placeLocation", JSON.stringify(placeLocation));

    try {
      const response = await axios.post("http://localhost:5001/user/add-event", Data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (!response.data) {
        console.log("Event add with error", response.data);
      } else {
        alert("Event added successfully");
      }
    } catch (error) {
      console.error("Error adding event:", error);
      alert("An error occurred while adding the event");
    }
  };

  return (
    <div className="add-event-container">
      <h2 className="add-event-title">Add Event for {placeName}</h2>
      <form className="add-event-form" onSubmit={handleSubmit}>
        <div className="add-event-form-group">
          <label className="add-event-label" htmlFor="eventType">Event Type</label>
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
          <label className="add-event-label" htmlFor="title">Event Title</label>
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
          <label className="add-event-label" htmlFor="description">Description</label>
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
          <label className="add-event-label" htmlFor="link">Event Link (Optional)</label>
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
          <label className="add-event-label" htmlFor="date">Event Date</label>
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
          <label className="add-event-label" htmlFor="time">Event Time</label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleInputChange}
            className="add-event-input"
          />
        </div>

        <div className="add-event-form-group">
          <label className="add-event-label" htmlFor="image">Upload Image</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="add-event-input"
          />
        </div>

        <button type="submit" className="add-event-submit-btn">Submit Event</button>
      </form>
    </div>
  );
};

export default AddEvent;
