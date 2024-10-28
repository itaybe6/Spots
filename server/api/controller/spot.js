// controller/spot.js

const Spot = require('../models/spot'); // Ensure this path is correct

// Function to save places to the database
const savePlacesToDatabase = async (places) => {
  try {
    const savedPlaces = [];
    for (const place of places) {
      const newSpot = new Spot({
        name: place.name,
        placeId: place.place_id,
        location: {
          lat: place.geometry.location.lat,
          lng: place.geometry.location.lng,
        },
        type: place.types[0], // Assume the first type is the primary
        rating: place.rating || 0,
        photoUrl: place.photoUrl || "", // Changed from 'photo' to 'photoUrl'
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

module.exports = {
  savePlacesToDatabase,
  getAllPlaces,
};
