import React, { useState, useEffect } from 'react';
import AddReview from './AddReview';
import ReviewsList from './ReviewsList';
import './PlaceInfo.css';

const PlaceInfo = ({ selectedPlace, onReviewSubmit, currentLocation }) => {
    const { name, allTypes, type, rating, photo, reviews, _id, location } = selectedPlace;

    // פונקציה לחישוב המרחק בקילומטרים בין מיקום המשתמש למקום
    const calculateDistance = (lat1, lng1, lat2, lng2) => {
        const toRad = (value) => (value * Math.PI) / 180;
        const R = 6371; // רדיוס כדור הארץ בקילומטרים
        const dLat = toRad(lat2 - lat1);
        const dLng = toRad(lng2 - lng1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    // חישוב זמן ההליכה בדקות לפי המרחק
    const calculateWalkingTime = (distanceKm) => {
        const walkingSpeedKmPerMin = 5 / 60; // מהירות הליכה ממוצעת בקמ"ש מחולקת ל-60 כדי לקבל ק"מ לדקה
        const walkingTimeInMinutes = distanceKm / walkingSpeedKmPerMin;
        return Math.round(walkingTimeInMinutes);
    };

    const distance = calculateDistance(
        currentLocation.lat,
        currentLocation.lng,
        location.lat,
        location.lng
    );

    return (
        <div className="place-info-container">
            <h2 className="place-info-title">{name}</h2>
            <div className="place-info-details">
                <p><strong>Primary Type:</strong> {type}</p>
                <p><strong>All Types:</strong> {allTypes.join(', ')}</p>
                <p><strong>Rating:</strong> {rating}</p>
                <p><strong>Distance from current location:</strong> {distance.toFixed(2)} km</p>
                <div className="walking-time">
                    <img src="https://img.icons8.com/ios-filled/50/000000/walking.png" alt="walking icon" className="walking-icon" />
                    <span>Estimated walking time: {calculateWalkingTime(distance)} minutes</span>
                </div>
            </div>
            {photo && <img src={photo} alt={name} className="place-info-photo" />}
            <div className="review-section">
                <AddReview onReviewSubmit={onReviewSubmit} _id={_id} />
                <ReviewsList reviews={reviews} />
            </div>
        </div>
    );
};

export default PlaceInfo;
