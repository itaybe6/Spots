const express = require('express');
const router = express.Router();
const { savePlacesToDatabase } = require('../controller/spot'); // Ensure the path is correct
const { addReview } = require('../controller/spot'); // Ensure the path is correct
const Spot = require('../models/spot'); // Ensure the path is correct for your model
const Review = require('../models/review'); // Import your Review model
const mongoose = require('mongoose');


// Route to save places to the database
router.post('/save-places', async (req, res) => {
  try {
    const places = req.body.places;
    //console.log("Saving places:", JSON.stringify(req.body.places));
    const savedPlaces = await savePlacesToDatabase(places);
    res.status(200).json(savedPlaces);
  } catch (error) {
    res.status(500).json({ message: "Error saving places", error });
  }
});


// POST route to add a review
router.post('/add-review', async (req, res) => {
  try {
    const review = req.body.review;
    const savedReview = await addReview(review);
    const id = req.body.id;
    if (mongoose.Types.ObjectId.isValid(id)) {
      await Spot.findByIdAndUpdate(id, { $push: { reviews: savedReview } });
    } else {
      throw new Error('Invalid ObjectId format');
    }


    res.status(201).json(savedReview);
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ message: 'Error adding review' });
  }
});

// Route to get all places from the database
router.get('/get-places', async (req, res) => {
  try {
    const places = await Spot.find({});
    res.status(200).json({ data: places });
  } catch (error) {
    console.error('Error fetching places:', error);
    res.status(500).json({ message: 'Error fetching places', error });
  }
});






module.exports = router;
