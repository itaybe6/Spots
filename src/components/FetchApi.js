import React, { useState, useEffect } from 'react';
import axios from 'axios';


// fetch data from api and send to function that save in db
function FetchApi({ setPlaces ,currentLocation}) {

  const fetchNearbyPlaces = async (pageToken = null) => {
    try {
      const params = {
        location: `${currentLocation.lat},${currentLocation.lng}`,
        radius: 3000,
        type: 'restaurant|bar|cafe|night_club|spa|park',
        key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
      };

      if (pageToken) {
        params.pagetoken = pageToken; // משתמשים ב-next_page_token אם קיים
      }

      const response = await axios.get(
        'http://localhost:8010/proxy/maps/api/place/nearbysearch/json',
        { params }
      );

      const fetchedPlaces = response.data.results.map((place) => ({
        ...place,
        types: place.types
          ? place.types.filter(
              (type) => type !== 'establishment' && type !== 'point_of_interest'
            )
          : [],
        photoUrl:
          place.photos && place.photos[0]
            ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
            : null,
      }));

      setPlaces((prevPlaces) => [...prevPlaces, ...fetchedPlaces]);

      // בודקים אם יש דף נוסף של תוצאות
      if (response.data.next_page_token) {
        // מחכים כדי לאפשר ל-next page token להתעדכן
        setTimeout(() => {
          fetchNearbyPlaces(response.data.next_page_token); // קריאה נוספת עם ה-token החדש
        }, 2000); // מחכים 2 שניות לפי דרישת גוגל
      } else {
        console.log('כל המקומות נשלפו.');
      }

      savePlaces(fetchedPlaces); // שומרים את המקומות שנשלפו
    } catch (error) {
      console.error('שגיאה בשליפת המקומות:', error);
    }
  };

  // שמירת מקומות למסד הנתונים
  const savePlaces = async (placesToSave) => {
    try {
      console.log('Places to be saved:', placesToSave);
      const response = await axios.post(
        'http://localhost:5001/api/save-places',
        { places: placesToSave }
      );
      console.log('Places saved successfully:', response.data);
    } catch (error) {
      console.error('Error saving places:', error);
    }
  };

  useEffect(() => {
    fetchNearbyPlaces();
  }, [currentLocation.lat, currentLocation.lng]); // משתמשים בערכים פנימיים של currentLocation

  return <div></div>;
}

export default FetchApi;
