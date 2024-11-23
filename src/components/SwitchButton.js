import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/SwitchButton.css';
import Fetch from './Fetch';


const SwitchButton = ({ onFilteredPlacesChange ,currentLocation }) => {
    const [isOpenFilterActive, setIsOpenFilterActive] = useState(false);
    const [updatedPlaces, setUpdatedPlaces] = useState([]);
    const [places, setPlaces] = useState([]);


    useEffect(() => {
        const fetchOpeningHours = async () => {
            const updatedPlacesWithHours = await Promise.all(
                places.map(async (place) => {
                    try {
                        const response = await axios.get('http://localhost:8010/proxy/maps/api/place/details/json', {
                            params: {
                                place_id: place.place_id, // ה-Place ID של המקום
                                fields: 'opening_hours',
                                key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
                            },
                        });

                        return {
                            ...place,
                            opening_hours: response.data.result.opening_hours || null, // עדכון שעות הפתיחה אם קיימות
                        };
                    } catch (error) {
                        console.error(`Error fetching details for place_id ${place.place_id}:`, error);
                        return { ...place, opening_hours: null }; // אם יש שגיאה, נעדכן כ-null
                    }
                })
            );

            setUpdatedPlaces(updatedPlacesWithHours);
        };

        fetchOpeningHours();
    }, [places]);

    useEffect(() => {
        // Apply the filter when the switch changes
        const filteredPlaces = isOpenFilterActive
            ? updatedPlaces.filter(place => place.opening_hours?.open_now)
            : updatedPlaces;

        // Pass the filtered places back to the parent component
        onFilteredPlacesChange(filteredPlaces);
    }, [isOpenFilterActive, updatedPlaces, onFilteredPlacesChange]);

    const handleSwitchToggle = () => {
        setIsOpenFilterActive(prev => !prev);
    };

    return (
        <div>
            <Fetch setPlaces={setPlaces} currentLocation={currentLocation} />
            <div className="power-switch">
                <input
                    type="checkbox"
                    checked={isOpenFilterActive}
                    onChange={handleSwitchToggle}
                />
                <div className="button">
                    <svg className="power-off">
                        <use href="#line" className="line" />
                        <use href="#circle" className="circle" />
                    </svg>
                    <svg className="power-on">
                        <use href="#line" className="line" />
                        <use href="#circle" className="circle" />
                    </svg>
                </div>
            </div>

            <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
                <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150" id="line">
                    <line x1="75" y1="34" x2="75" y2="58" />
                </symbol>
                <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150" id="circle">
                    <circle cx="75" cy="80" r="35" />
                </symbol>
            </svg>
        </div>
    );
};

export default SwitchButton;
