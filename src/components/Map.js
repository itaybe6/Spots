import React, { useState, useEffect }, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, InfoWindow, Marker, InfoWindow, useJsApiLoader, useJsApiLoader } from '@react-google-maps/api';
import { mapOptions } from './MapConfiguration';
import axios from 'axios';
import PlaceInfo from './PlaceInfo'; // ייבוא רכיב PlaceInfo
import CustomMarker from '../assets/images/Restaurant.png';
import Drinks from '../assets/images/Drinks.png';

const Map = () => {
  const libraries = ['places'];

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  });

  const [currentLocation, setCurrentLocation] = useState(null);
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const containerStyle = {
    width: '90vw',
    height: '90vh',
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => console.error("Error fetching current location:", error)
    );
  }, []);

  const fetchNearbyPlaces = async () => {
    if (!currentLocation) return;

    try {
      const response = await axios.get('http://localhost:8010/proxy/maps/api/place/nearbysearch/json', {
        params: {
          location: `${currentLocation.lat},${currentLocation.lng}`,
          radius: 5000,
          type: 'restaurant|bar|cafe|night_club|spa|park',
          key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        },
      });

      const filteredPlaces = response.data.results.filter((place) =>
        ['restaurant', 'bar', 'cafe', 'night_club', 'spa', 'park'].some((type) =>
          place.types.includes(type)
        )
      );

      setPlaces(filteredPlaces);
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  };

  useEffect(() => {
    if (isLoaded && currentLocation) {
      fetchNearbyPlaces();
    }
  }, [isLoaded, currentLocation]);

  if (!isLoaded) return <div>Loading Google Maps...</div>;
  if (!currentLocation) return <div>Loading current location...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={currentLocation}
      zoom={14}
      options={{
        styles: mapOptions.mapTheme,
      }}
    >
      {places.map((place) => (
        <Marker
          key={place.place_id}
          position={{
            lat: place.geometry.location.lat,
            lng: place.geometry.location.lng,
          }}
          options={{
            icon: {
              url: place.types.includes('bar') ? Drinks : CustomMarker,
              scaledSize: new window.google.maps.Size(20, 20),
            },
          }}
          onClick={() => setSelectedPlace(place)}
        />
      ))}

      {selectedPlace && (
        <InfoWindow
          position={{
            lat: selectedPlace.geometry.location.lat,
            lng: selectedPlace.geometry.location.lng,
          }}
          onCloseClick={() => setSelectedPlace(null)}
        >
          {/* הצגת רכיב PlaceInfo בתוך ה-InfoWindow */}
          <PlaceInfo
            name={selectedPlace.name}
            address={selectedPlace.vicinity}
          />
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default Map;
