// controller/spot.js

const Spot = require('../models/spot'); // Ensure this path is correct
const Review = require('../models/review'); // Ensure this path is correct


// Function to save places to the database
const savePlacesToDatabase = async (places) => {
  try {
    const savedPlaces = [];
    for (const place of places) {
      const newSpot = new Spot({
        name: place.name,
        adress : place.vicinity,
        placeId: place.place_id,
        location: {
          lat: place.geometry.location.lat,
          lng: place.geometry.location.lng,
        },
        type: place.types[0], // Assume the first type is the primary
        rating: place.rating || 0,
        photo: place.photoUrl || "", // Changed from 'photo' to 'photoUrl'
        allTypes: place.types, // Use an array for all types
        reviews: place.reviews || [] // In case there are reviews
      });

      const savedSpot = await newSpot.save();
      savedPlaces.push(savedSpot);
    }
    return savedPlaces;
  } catch (error) {
    console.error('Error saving places:', error);
    throw new Error('Failed to save places to database');
  }
};

// Function to get all places from the database
const getAllPlaces = async () => {
  try {
    const places = await Spot.find({});
    return places;
  } catch (error) {
    console.error('Error fetching places:', error);
    throw new Error('Failed to fetch places from database');
  }
};

// Function to add a review
const addReview = async (reviewData) => { // Changed parameter name for clarity
  const savedReview = [];
  const now = Date.now();
  try {
    // Create a new review
    const newReview = new Review({
      rating: reviewData.rating,
      comment: reviewData.comment
    });

    // Save the review
    const savedNewReview = await newReview.save();
    savedReview.push(savedNewReview);
    return savedReview;
  } catch (error) {
    console.error('Error saving Review:', error);
    throw new Error('Failed to save review to database'); // Adjusted error message
  }
};



module.exports = {
  savePlacesToDatabase,
  getAllPlaces,
  addReview,
};
