const express = require('express'); 
const router = express.Router();
const { savePlacesToDatabase } = require('../controller/spot'); // Ensure the path is correct
const Spot = require('../models/spot'); // Ensure the path is correct for your model

// Route to save places to the database
router.post('/save-places', async (req, res) => {
  try {
    const places = req.body.places;
    // console.log("Saving places:", JSON.stringify(req.body.places));
    const savedPlaces = await savePlacesToDatabase(places);
    res.status(200).json(savedPlaces);
  } catch (error) {
    res.status(500).json({ message: "Error saving places", error });
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
