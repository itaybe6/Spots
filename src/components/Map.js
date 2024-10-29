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

  const telAvivCenter = {
    lat: 32.0853,
    lng: 34.7818,
  };

  const [currentLocation, setCurrentLocation] = useState(telAvivCenter);
  const [places, setPlaces] = useState([]);
  const [placesget, setPlacesGet] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const containerStyle = {
    width: '90vw',
    height: '90vh',
  };

  const fetchNearbyPlaces = async () => {
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
          place.types && // Check if place.types exists
          ['restaurant', 'bar', 'cafe', 'night_club', 'spa', 'park'].some((type) =>
            place.types.includes(type)
          )
        )
        .map(place => ({
          ...place,
          types: place.types ? place.types.filter(type => type !== 'establishment' && type !== 'point_of_interest') : [],
          photoUrl: place.photos && place.photos[0]
            ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
            : null
        }));
  
      setPlaces(filteredPlaces);
      console.log("Filtered Places:", filteredPlaces); 
  
  
      localStorage.setItem("lastFetchTime", Date.now());
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  };
  
  const savePlaces = async (placesToSave) => {
    try {
      console.log('Places to be saved:', placesToSave);
      const response = await axios.post('http://localhost:5001/api/save-places', { places: placesToSave });
      console.log('Places saved successfully:', response.data);
    } catch (error) {
      console.error('Error saving places:', error);
    }
  };

  const handleReviewSubmit = async (spotId, review) => {
    try {
      // Make API call to save the review
      await axios.post('http://localhost:5001/api/add-review', { spotId, review });
      console.log('Review submitted successfully');
      // Optionally fetch reviews again or update local state
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  // Fetch places from the database
  const fetchSavedPlaces = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/get-places');
      console.log('Places from database:', response.data.data);
      // Optionally, update the `places` state with data from the database if desired
      setPlacesGet(response.data.data);
      // console.log("dolev database "+ JSON.stringify(placesget));
    } catch (error) {
      console.error('Error fetching places from database:', error);
    }
  };

  useEffect(() => {
    if (isLoaded) {
      const lastFetchTime = localStorage.getItem("lastFetchTime");
      const now = Date.now();
      const dayInMs = 24 * 60 * 60 * 1000;
        // Check if 24 hours have passed
      if (!lastFetchTime || now - lastFetchTime > dayInMs) {
          fetchNearbyPlaces();
      }

      fetchSavedPlaces();

    }
  }, [isLoaded]);

  if (!isLoaded) return <div>Loading Google Maps...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={currentLocation}
      zoom={14}
      options={{
        styles: mapOptions.mapTheme,
      }}
    >
      {placesget.map((place) => (
        (place.geometry?.location || place.location) ? (
          <Marker

            key={place.place_id || place._id}
            position={{
              lat: place.geometry?.location?.lat || place.location?.lat,
              lng: place.geometry?.location?.lng || place.location?.lng,
            }}
            options={{
              icon: {
                url: place.types && place.types.includes('bar') ? Drinks : CustomMarker,
                scaledSize: new window.google.maps.Size(20, 20),
              },
            }}
            onClick={() => setSelectedPlace(place)}
          />
        ) : null 
      ))}

      {selectedPlace && (
        <InfoWindow
          position={{
            lat: selectedPlace.geometry?.location?.lat || selectedPlace.location?.lat,
            lng: selectedPlace.geometry?.location?.lng || selectedPlace.location?.lng,
          }}
          onCloseClick={() => setSelectedPlace(null)}
        >
          <PlaceInfo
            name={selectedPlace.name}
            coordinates={selectedPlace.geometry?.location || selectedPlace.location}
            allTypes={selectedPlace.allTypes} 
            primaryType={selectedPlace.type}
            rating={selectedPlace.rating}
            photo={selectedPlace.photo}
            reviews={selectedPlace.reviews}
            spotId={selectedPlace.placeId}

            onReviewSubmit={handleReviewSubmit} // Function to handle review submission

            
          />
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default Map;
