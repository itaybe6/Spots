import React, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, InfoWindow, Marker, useJsApiLoader } from '@react-google-maps/api';
import { mapOptions } from './MapConfiguration';
import CustomMarker from '../assets/images/Restaurant.png';
import Drinks from '../assets/images/Drinks.png';
import "./Map.css";

const Map = (props) => {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey :props.id,
    });
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [currentPosition, setCurrentPosition] = useState(null);

    

    const containerStyle = {
        width: '90vw',
        height: '90vh',
    };

    const center = {
        lat: 31.76904,
        lng: 35.21633,
    };

    const markers = [
        {
            name: "location-1",
            status: "CustomMarker",
            location: {
                lat: 31.25181,
                lng: 34.7913,
            },
        },
        {
            name: "location-2",
            status: "Drinks",
            location: {
                lat: 32.794044,
                lng: 34.989571,
            },
        },
        {
            name: "location-3",
            status: "CustomMarker",
            location: {
                lat: 32.109333,
                lng: 34.855499,
            },
        },
        {
            name: "location-4",
            status: "Drinks",
            location: {
                lat: 31.76904,
                lng: 35.21633,
            },
        },
    ];

    const success = useCallback((position) => {
        const current = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
        };
        setCurrentPosition(current);
    }, []);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success);
        }
    }, [success]);


    return isLoaded && (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={8}
            options={{
                pixelOffset: new window.google.maps.Size(0, -40),
                styles: mapOptions.mapTheme,
            }}
        >
            {currentPosition && (
                <Marker
                    key="current-position"
                    position={currentPosition}
                    options={{
                        icon: {
                            url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png", // Custom icon for current position
                            scaledSize: new window.google.maps.Size(20, 20),
                        },
                    }}
                />
            )}
            {markers.map((marker) => (
                <Marker
                    key={marker.location.lat + marker.location.lng}
                    position={marker.location}
                    options={{
                        icon: {
                            url: marker.status === 'CustomMarker' ? CustomMarker : marker.status === "Drinks" ? Drinks : "",
                            scaledSize: new window.google.maps.Size(20, 20),
                        },
                    }}
                    onClick={() => {
                        setSelectedMarker(marker);
                    }}
                />
            ))}
            {selectedMarker && (
                <InfoWindow
                    position={selectedMarker.location}
                    onCloseClick={() => {
                        setSelectedMarker(null);
                    }}
                >
                    <div>
                        <h1>{selectedMarker.name}</h1>
                        <h2>Status: {selectedMarker.status}</h2>
                        <button onClick={() => {
                            setSelectedMarker(null);
                        }}>close</button>
                    </div>
                </InfoWindow>
            )}
        </GoogleMap>
    );
};

export default Map;
