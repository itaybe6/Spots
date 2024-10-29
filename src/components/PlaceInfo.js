// PlaceInfo.js
import React from 'react';
import AddReview from './AddReview';
import ReviewsList from './ReviewsList';

const PlaceInfo = ({ selectedPlace, onReviewSubmit }) => {
    const { name, allTypes, type, rating, photo, reviews } = selectedPlace;

    return (
        <div>
            <h2>{name}</h2>
            <p>Primary Type: {type}</p>
            <p>All Types: {allTypes?.join(', ')}</p>
            <p>Rating: {rating}</p>
            {photo && <img src={photo} alt={name} style={{ width: '100%', height: '15%' }} />}
            <AddReview onReviewSubmit={onReviewSubmit} />
            <ReviewsList reviews={reviews} />
        </div>
    );
};

export default PlaceInfo;
