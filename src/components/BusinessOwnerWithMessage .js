import React, { useState } from "react";
import axios from "axios";
import "../style/BusinessOwnerWithMessage.css";

const BusinessOwnerWithMessage = ({ isCloseModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // שליחת בקשת התחברות לשרת
      const response = await axios.post("http://localhost:5001/user/login", {
        email,
        password,
      });

      // שמירת הטוקן ב-localStorage
      localStorage.setItem("authToken", response.data.token);

      // הודעת הצלחה וסגירת החלון
      alert("Login successful!" );
      alert(localStorage.getItem("authToken"))
      isCloseModal();
    } catch (error) {
      // טיפול בשגיאות
      setErrorMessage(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-button" onClick={isCloseModal}>
          &times;
        </button>
        <h1 className="modal-title">Business Owner Login</h1>
        <p className="modal-description">
          If you haven't verified your business yet, you can do so by locating
          your business on the map and clicking the "Verify" button.
        </p>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="button business-owner-btn" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default BusinessOwnerWithMessage;
