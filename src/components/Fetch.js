import React, { useState, useEffect } from 'react';
import axios from 'axios';


// fetch places in 5 km radius 
function Fetch({ setPlaces, currentLocation }) {
    const fetchSavedPlaces = async () => {
        if (currentLocation == null) {
            return
        }

      try {
        const response = await axios.get('http://localhost:5001/api/get-places');
  
        // פילטר מקומות בטווח של 5 ק"מ
        const filteredPlaces = response.data.data.filter((place) => {
          const distance = calculateDistance(
            currentLocation.lat,
            currentLocation.lng,
            place.location.lat,
            place.location.lng
          );
          return distance <= 5; // מסנן רק מקומות בטווח של 5 ק"מ
        });
        setPlaces(filteredPlaces); // שמירת המקומות המסוננים
      } catch (error) {
        console.error('Error fetching places from database:', error);
      }
    };
    const calculateDistance = (lat1, lng1, lat2, lng2) => {
      const toRadians = (degree) => (degree * Math.PI) / 180;
      const R = 6371; // רדיוס כדור הארץ בקילומטרים
      const dLat = toRadians(lat2 - lat1);
      const dLng = toRadians(lng2 - lng1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) *
          Math.cos(toRadians(lat2)) *
          Math.sin(dLng / 2) *
          Math.sin(dLng / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c; // מחזיר את המרחק בקילומטרים
    };
    useEffect(() => {
        fetchSavedPlaces();
  
    }, [currentLocation]);
    
  
    return <div></div>;
  }
  
  export default Fetch;
  