import React, { useState, useEffect } from 'react';
import { GoogleMap, InfoWindow, Marker, useJsApiLoader } from '@react-google-maps/api';
import { mapOptions } from './MapConfiguration';
import axios from 'axios';
import PlaceInfo from './PlaceInfo';

import Drinks from '../assets/images/Drinks.png';
import Bar from '../assets/images/Bar.png';
import Coffee from '../assets/images/Coffee.png';
import Park from '../assets/images/Park.png';
import Restaurant from '../assets/images/Restaurant.svg';
import Spa from '../assets/images/Spa.png';



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
  const [selectedType, setSelectedType] = useState('bar'); // State to hold the selected type


  const containerStyle = {
    width: '90vw',
    height: '90vh',
  };


  const onCloseFunc = () => {
    setSelectedPlace("")
    const unwantedArrow = document.querySelectorAll('.gm-style-iw-t');
    unwantedArrow.forEach(arrow => arrow.parentNode.removeChild(arrow));

  }

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
      // savePlaces(filteredPlaces);


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

  const getIconUrl = (placeType) => {
    const icons = {
        bar: Bar,
        spa: Spa,
        restaurant: Restaurant,
        cafe: Coffee,
        night_club: Drinks,
        park: Park,
    };


    return icons[placeType] || Restaurant;
};


  const handleReviewSubmit = async (id, review) => {
    try {
      const response = await axios.post('http://localhost:5001/api/add-review', { id, review });
      console.log('Review submitted successfully:', response.data);
      if (selectedPlace) {
        const newReview = {
          ...review,
          _id: response.data._id,
          timestamp: Date.now(),
        };
        const updatedReviews = [...(selectedPlace.reviews || []), newReview];
        setSelectedPlace(prev => ({ ...prev, reviews: updatedReviews }));
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  // Fetch places from the database
  const fetchSavedPlaces = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/get-places');
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

  if (!isLoaded) return <div>Loading Google Maps...</div>


  return (
    <div>
      <div style={{ margin: '10px 0' }}>
        <label htmlFor="placeType" style={{ marginRight: '10px' }}>Select Place Type:</label>
        <select
          id="placeType"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)} // Update selected type on change
          style={{ padding: '5px', fontSize: '16px' }}
        >
          <option value="bar">Bar</option>
          <option value="restaurant">Restaurant</option>
          <option value="cafe">Café</option>
          <option value="night_club">Night Club</option>
          <option value="spa">Spa</option>
          <option value="park">Park</option>
        </select>
      </div>

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
                  url: getIconUrl(place.type),
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

            onCloseClick={onCloseFunc}
            options={{ zIndex: 999 }}
          >


            <PlaceInfo selectedPlace={selectedPlace} onReviewSubmit={handleReviewSubmit} />


          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};

export default Map;
