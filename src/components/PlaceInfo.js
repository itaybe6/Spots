import React from 'react';

const PlaceInfo = ({ name, address }) => {
  return (
    <div>
      <h2>{name}</h2>
      <p>Address: {address}</p>
      {/* ניתן להוסיף עוד מידע ותוכן כאן */}
    </div>
  );
};

export default PlaceInfo;
