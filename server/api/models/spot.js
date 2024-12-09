const mongoose = require('mongoose');
const reviewSchema = require('./review').schema; // Import the schema, not the model


const SpotSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  adress: {
    type: String,
    required: true
  },
  placeId: {
    type: String,
    required: true,
    unique: true
  },
  location: {
    lat: {
      type: Number,
      required: true
    },
    lng: {
      type: Number,
      required: true
    }
  },
  type: {
    type: String,
    // enum: ['Restaurant', 'Bar', 'Club', 'Spa', 'Playground', 'Workshop', 'Park'],
    required: true
  },
  rating: {
    type: Number,
    default: 0
  },
  reviews: [reviewSchema],  // Embedding ReviewSchema directly

  photo: {
    type: String,
  },
  allTypes: {
    type: [String],
    required: true
  },
  verify: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Spot', SpotSchema);
