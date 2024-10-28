const mongoose = require('mongoose');
const Review = require('./review'); // יבוא של הסכמה של ביקורות

const SpotSchema = new mongoose.Schema({
  name: {
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
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'
  }],
  photo: {
    type: String,
  },
  allTypes: {
    type: [String],
    required: true
  }
});

module.exports = mongoose.model('Spot', SpotSchema);
