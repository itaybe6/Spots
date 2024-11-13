// controller/spot.js

const Spot = require('../models/spot'); // Ensure this path is correct
const Review = require('../models/review'); // Ensure this path is correct
const fs = require('fs');


// Function to save places to the database
const savePlacesToDatabase = async (places) => {

  try {
    const savedPlaces = [];
    for (const place of places) {

      const existingPlace = await Spot.findOne({ placeId: place.place_id });
      if (existingPlace) {
        console.log('Place already exists:', place.placeId);
        continue
      }
      const newSpot = new Spot({
        name: place.name,
        adress: place.vicinity,
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
const addReview = async (req, res) => {
  try {
    const { rating, comment, id } = req.body; // ה-id מועבר כחלק מהגוף של הבקשה
    let imageData = null;

    if (req.file) {
      const imageBuffer = fs.readFileSync(req.file.path);
      imageData = imageBuffer.toString('base64');
      fs.unlinkSync(req.file.path);
    }

    const newReview = new Review({
      rating,
      comment,
      timestamp: Date.now(),
      imageData
    });

    const savedReview = await newReview.save();

    if (id) {
      await Spot.findByIdAndUpdate(id, { $push: { reviews: savedReview } });
    }

    res.status(201).json(savedReview);
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ message: 'Error adding review' });
  }
};



module.exports = {
  savePlacesToDatabase,
  getAllPlaces,
  addReview,
};





