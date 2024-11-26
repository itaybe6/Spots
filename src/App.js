import Map from "./components/Map";
import React, { useState, useEffect } from 'react';
import Fetch from "./components/Fetch";
import FetchApi from "./components/FetchApi";
import { useJsApiLoader } from '@react-google-maps/api';
import { libraries } from './components/libraries';
import StarRating from "./components/StarRating";

function App() {
  const [places, setPlaces] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);


  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  });

  useEffect(() => {
    if (isLoaded) {

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setCurrentLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (error) => console.error("שגיאה בקבלת מיקום המשתמש:", error)
        );
      }

    }
  }, [isLoaded]);



  const [rating, setRating] = useState(0);

  return (
    <div className="App">




      {currentLocation && (<Fetch setPlaces={setPlaces} currentLocation={currentLocation} />)}
      {/* <FetchApi setPlaces={setPlaces} currentLocation ={currentLocation}/> */}
      {places && currentLocation && (
        <Map
          currentLocation={currentLocation}
          places={places}
          setPlaces={setPlaces}
        />
      )}
    </div>
  )
}
export default App;