const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({

  rating: {
    type: Number,
    required: true
  },
  comment: {
    type: String,
    required: true
  }, imageData: {
    type: String, // נתיב לתמונה שנשמר בשרת
    required: false,
  },
  timestamp: {
    type: Date,
    default: Date.now,
    required: true
  }
});

module.exports = mongoose.model('Review', ReviewSchema);




