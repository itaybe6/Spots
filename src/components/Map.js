import React, { useState } from 'react';
import { GoogleMap, InfoWindow, Marker } from '@react-google-maps/api';
import { mapOptions } from './MapConfiguration';
import CustomMarker from '../assets/images/Restaurant.png';
import Drinks from '../assets/images/Drinks.png';

const Map = (props) => {
    const { isLoaded } = props;
    const [selectedMarker, setSelectedMarker] = useState(null); // Changed initial state to null
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

    const options = {};

    return isLoaded && (
        <>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={8}
                options={{
                    options,
                    styles: mapOptions.mapTheme,
                }}
            >
                {markers.map((marker) => {
                    return (
                        <Marker
                            key={marker.location.lat + marker.location.lng}
                            position={marker.location}
                            options={{
                                icon: {
                                    url: marker.status === 'CustomMarker' ? CustomMarker : marker.status === "Drinks" ? Drinks : "",
                                    scaledSize: new window.google.maps.Size(20, 20), // Adjust the width and height here
                                },
                            }}
                            onClick={() => {
                                setSelectedMarker(marker);
                            }}
                        />
                    );
                })}
                {selectedMarker && (
                    <InfoWindow
                        position={selectedMarker.location} // Set position prop to the marker location
                        onCloseClick={() => {
                            setSelectedMarker(null); // Use null to close the InfoWindow
                        }}
                    >
                        <div style={{backgroundColor : "pink"}}>
                            <h1>{selectedMarker.name}</h1>
                            <h2>Status: {selectedMarker.status}</h2>
                            <button onClick={() => {
                                setSelectedMarker("");
                            }}>close</button>
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        </>
    );
};

export default Map;
