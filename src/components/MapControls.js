import React from 'react';
import RadiusFilter from './RadiusFilter';
import SwitchButton from './SwitchButton';
import SwitchButton2 from './SwitchButton2';

import "../style/MapControls.css"
const MapControls = ({ selectedType, setSelectedType, searchTerm, setSearchTerm, handleSearch, currentLocation, onFilteredPlacesChange,nameOfPlaces }) => {
  return (
    <div className="container">
      <div style={{ marginTop: '10px', marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Search for a place"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '5px', marginRight: '10px', width: 150 }}
        />
        <button
          onClick={handleSearch}
          style={{ padding: '5px', fontSize: '16px' }}
        >
          Search
        </button>
      </div>

      <label>Select Place Type:</label>
      <select
        id="placeType"
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
        style={{ padding: '5px', fontSize: '16px' }}
      >
        <option value="all">All</option>
        <option value="bar">Bar</option>
        <option value="restaurant">Restaurant</option>
        <option value="cafe">Café</option>
        <option value="night_club">Night Club</option>
        <option value="spa">Spa</option>
        <option value="park">Park</option>
      </select>

      <RadiusFilter
        currentLocation={currentLocation}
        setFilteredPlaces={onFilteredPlacesChange}
      />
    
        <SwitchButton onFilteredPlacesChange={onFilteredPlacesChange} currentLocation={currentLocation} />
        <SwitchButton2 onFilteredPlacesChange={onFilteredPlacesChange} currentLocation={currentLocation} nameOfPlaces = {nameOfPlaces}/>
    </div>
  );
};

export default MapControls;
