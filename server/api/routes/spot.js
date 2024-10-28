const express = require('express');
const router = express.Router();
const { savePlacesToDatabase } = require('../controller/spot');

// ניתוב לשמירת מקומות
router.post('/save-places', async (req, res) => {
  try {
    const places = req.body.places;
    const savedPlaces = await savePlacesToDatabase(places);
    res.status(200).json(savedPlaces);
  } catch (error) {
    res.status(500).json({ message: "Error saving places", error });
  }
});

module.exports = router;
