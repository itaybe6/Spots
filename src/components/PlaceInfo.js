import React, { useState } from 'react';

const PlaceInfo = ({
  name,
  address,
  coordinates,
  type,
  primaryType,
  allTypes,
  rating,
  photo,
  reviews,
  id,
  spotId,  // Ensure this is included
  onReviewSubmit  // Ensure this is included
}) => {
  const [review, setReview] = useState({ rating: '', comment: '' });

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    onReviewSubmit(id, review); // Call the review submit function
    setReview({ rating: '', comment: '' }); // Reset review state
  };

  return (
    <div>
      <h2>{name}</h2>
      <p>{address}</p>
      <p>spotId: {spotId}</p>
      <p>id: {id}</p>

      {/* {coordinates && <p>Coordinates: {coordinates.lat}, {coordinates.lng}</p>} */}
      <p>Primary Type: {primaryType}</p>
      <p>All Types: {allTypes.join(', ')}</p> Check for undefined
      <p>reviews: {reviews}</p> Check for undefined

      <p>Rating: {rating}</p>
      {photo && <img src={photo} alt={name} style={{ width: '100%', height: '15%' }} />}

      <form onSubmit={handleSubmit}>
        <h3>Add a Review</h3>
        <input
          type="number"
          min="1"
          max="5"
          placeholder="Rating (1-5)"
          value={review.rating}
          onChange={(e) => setReview({ ...review, rating: e.target.value })}
          required
        />
        <textarea
          placeholder="Comment"
          value={review.comment}
          onChange={(e) => setReview({ ...review, comment: e.target.value })}
          required
        />
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default PlaceInfo;