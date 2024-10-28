import React from 'react';

const PlaceInfo = ({ name, address, coordinates, types, rating, photo }) => {
  const primaryType = types.find(type => ['restaurant', 'bar', 'cafe', 'night_club', 'spa', 'park'].includes(type)) || types[0];

  return (
    <div>
      <h2>{name}</h2>
      <p>{address}</p>
      {/* {coordinates && <p>Coordinates: {coordinates.lat}, {coordinates.lng}</p>} */}
      <p>Primary Type: {primaryType}</p>
      <p>All Types: {types.join(', ')}</p>
      <p>Rating: {rating}</p>
      {photo && <img src={photo} alt={name} style={{ width: '100%', height: 'auto' }} />}
    </div>
  );
};

export default PlaceInfo;