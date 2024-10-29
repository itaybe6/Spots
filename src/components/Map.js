import React, { useState, useEffect } from 'react';
import { GoogleMap, InfoWindow, Marker, useJsApiLoader } from '@react-google-maps/api';
import { mapOptions } from './MapConfiguration';
import axios from 'axios';
import PlaceInfo from './PlaceInfo';
import CustomMarker from '../assets/images/images.png';
import Drinks from '../assets/images/Drinks.png';
import SpaIcon from '../assets/images/spa.webp';
import Party from '../assets/images/party.avif';


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
    console.log("dolev hereeeeee");
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
      bar: Drinks,
      spa: SpaIcon, // Use your spa icon here
      restaurant: CustomMarker,
      cafe: CustomMarker,
      night_club: Party,
      park: CustomMarker,
      // Add more types and their respective icons as needed
    };

    return icons[placeType] || CustomMarker; // Default to CustomMarker if type not found
  };


  const handleReviewSubmit = async (id, review) => {
    try {
      // Make API call to save the review
      const response = await axios.post('http://localhost:5001/api/add-review', { id, review });
      console.log('Review submitted successfully:', response.data);
      
      // Update the selectedPlace with the new review in real-time
      if (selectedPlace) {
        // Create a new review object with the response data
        const newReview = {
          ...review,
          _id: response.data._id, // Assuming the response contains the new review ID
          timestamp: Date.now(), // Add a timestamp for the new review
        };
        // Update the reviews state of selectedPlace
        const updatedReviews = [...(selectedPlace.reviews || []), newReview];
        setSelectedPlace(prev => ({ ...prev, reviews: updatedReviews })); // Update the state with the new reviews
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
  // console.log("neeed "+ JSON.stringify(places));

  return (
      <div>
        {/* Dropdown for selecting place type */}
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
                    url: getIconUrl(place.type) ,
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
                id={selectedPlace._id}
                address={selectedPlace.address}
                onReviewSubmit={handleReviewSubmit}
              />
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
    );
  };
  
  export default Map;
