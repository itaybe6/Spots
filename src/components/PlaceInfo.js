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
  spotId,
  onReviewSubmit
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
      <p>Primary Type: {primaryType}</p>
      <p>All Types: {allTypes.join(', ')}</p>
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
      <h3>Reviews:</h3>
      {reviews && reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review._id}>
            <p>Rating: {review.rating}</p>
            <p>Comment: {review.comment}</p>
            <p>Timestamp: {new Date(review.timestamp).toLocaleString()}</p>
          </div>
        ))
      ) : (
        <p>No reviews available.</p>
      )}
    </div>
  );
};

export default PlaceInfo;
