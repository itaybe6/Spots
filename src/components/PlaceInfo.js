import React from 'react';

const PlaceInfo = ({ name, address,allTypes ,coordinates, rating, photo,primaryType  }) => {
  //const primaryType = types.find(type => ['restaurant', 'bar', 'cafe', 'night_club', 'spa', 'park'].includes(type)) || types[0];

  return (
    <div>
      <h2>{name}</h2>
      <p>{address}</p>
      {/* {coordinates && <p>Coordinates: {coordinates.lat}, {coordinates.lng}</p>} */}
      <p>Primary Type: {primaryType}</p>
      <p>All Types: {allTypes.join(', ') }</p> Check for undefined
      <p>Rating: {rating}</p>
      {photo && <img src={photo} alt={name} style={{ width: '100%', height: '15%' }} />}
    </div>
  );
};

export default PlaceInfo;