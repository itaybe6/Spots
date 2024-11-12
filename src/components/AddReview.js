import React, { useState } from 'react';
import './AddReview.css';

const AddReview = ({ onReviewSubmit, _id }) => {
    const [review, setReview] = useState({ rating: '', comment: '' });
    const [image, setImage] = useState(null); // משתנה חדש לאחסון התמונה

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('rating', review.rating);
        formData.append('comment', review.comment);
        formData.append('image', image); // הוספת התמונה ל-FormData

        onReviewSubmit(_id, formData);
        setReview({ rating: '', comment: '' });
        setImage(null);
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
                <label htmlFor="image">Upload Image:</label>
                <input
                    type="file"
                    id="image"
                    onChange={(e) => setImage(e.target.files[0])}
                />
                <button type="submit">Submit Review</button>
            </form>
        </div>
    );
};

export default AddReview;
