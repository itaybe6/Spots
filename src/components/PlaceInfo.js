import React, { useState } from 'react';
import ReviewsList from './ReviewsList';

const PlaceInfo = ({ selectedPlace, onReviewSubmit }) => {
  const { name, allTypes, type, rating, photo, reviews, _id, } = selectedPlace;
  const [review, setReview] = useState({ rating: '', comment: '' });

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    onReviewSubmit(_id, review); // Call the review submit function
    setReview({ rating: '', comment: '' }); // Reset review state
  };


  return (
    <div>
      <h2>{name}</h2>
      <p>Primary Type: {type}</p>
      <p>All Types: {allTypes?.join(', ')}</p>
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
      <ReviewsList reviews={reviews} />
    </div>
  );
};

export default PlaceInfo;
