import React, { useState, useEffect } from 'react';
import { GoogleMap, InfoWindow, Marker, useJsApiLoader } from '@react-google-maps/api';
import { mapOptions } from './MapConfiguration';
import axios from 'axios';
import PlaceInfo from './PlaceInfo';
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

      const filteredPlaces = response.data.results
        .filter((place) =>
          ['restaurant', 'bar', 'cafe', 'night_club', 'spa', 'park'].some((type) =>
            place.types.includes(type)
          )
        )
        .map(place => ({
          ...place,
          types: place.types.filter(type => type !== 'establishment' && type !== 'point_of_interest'),
          photoUrl: place.photos && place.photos[0]
            ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
            : null
        }));

      setPlaces(filteredPlaces);
      console.log(filteredPlaces);
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
          position={
            place.geometry && place.geometry.location
              ? {
                  lat: place.geometry.location.lat, // Fixed access
                  lng: place.geometry.location.lng, // Fixed access
                }
              : null
          }
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
          position={
            selectedPlace.geometry && selectedPlace.geometry.location
              ? {
                  lat: selectedPlace.geometry.location.lat, // Fixed access
                  lng: selectedPlace.geometry.location.lng, // Fixed access
                }
              : currentLocation
          }
          onCloseClick={() => setSelectedPlace(null)}
        >
          <PlaceInfo
            name={selectedPlace.name}
            address={selectedPlace.vicinity}
            coordinates={selectedPlace.geometry ? selectedPlace.geometry.location : null}
            types={selectedPlace.types}
            rating={selectedPlace.rating}
            photo={selectedPlace.photoUrl}
          />
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default Map;
