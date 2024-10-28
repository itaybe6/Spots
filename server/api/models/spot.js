const mongoose = require('mongoose');
const Review = require('./review'); // Importing the review schema

const SpotSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  placeId: {
    type: String,
    required: true,
    unique: true,
  },
  location: {
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
  },
  type: {
    type: String,
    enum: ['Restaurant', 'Bar', 'Club', 'Spa', 'Playground', 'Workshop', 'Park'],
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  photo: {
    type: String, // Store the photo URL
    required: false, // Make it optional
  },
  allTypes: {
    type: [String], // Array of strings for all types
    required: false, // Make it optional
  },
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review',
  }],
});

module.exports = mongoose.model('Spot', SpotSchema);
