import React from 'react';

const MapControls = ({ selectedType, setSelectedType, searchTerm, setSearchTerm, handleSearch }) => {
  return (
    <div>
      <div style={{ margin: '10px 0' ,marginTop :'80px' }}>
        <label
          htmlFor="placeType"
          style={{
            marginRight: '10px',
            padding: '5px',
            fontSize: '16px',
            border: '1px solid gray',
            borderRadius: '5px',
            backgroundColor: 'gray',
          }}
        >
          Select Place Type:
        </label>
        <select
          id="placeType"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)} // Update selected type on change
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
      </div>

      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Search for a place"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '5px', fontSize: '16px', marginRight: '10px', width: 150 }}
        />
        <button onClick={handleSearch} style={{ padding: '5px', fontSize: '16px' }}>
          Search
        </button>
      </div>
    </div>
  );
};

export default MapControls;
