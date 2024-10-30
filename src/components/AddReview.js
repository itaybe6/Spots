// AddReview.js
import React, { useState } from 'react';
import './AddReview.css';

const AddReview = ({ onReviewSubmit ,_id}) => {
    const [review, setReview] = useState({ rating: '', comment: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        onReviewSubmit(_id,review);
        setReview({ rating: '', comment: '' });
    };

    return (
        <div className="add-review-container">
            <h3>Add a Review</h3>
            <form onSubmit={handleSubmit} className="review-form">
                <label htmlFor="rating">Rating:</label>
                <input
                    type="number"
                    id="rating"
                    min="1"
                    max="5"
                    placeholder="1-5"
                    value={review.rating}
                    onChange={(e) => setReview({ ...review, rating: e.target.value })}
                    required
                />
                <label htmlFor="comment">Comment:</label>
                <textarea
                    id="comment"
                    placeholder="Write your comment..."
                    value={review.comment}
                    onChange={(e) => setReview({ ...review, comment: e.target.value })}
                    required
                />
                <button type="submit">Submit Review</button>
            </form>
        </div>
    );
};

export default AddReview;
