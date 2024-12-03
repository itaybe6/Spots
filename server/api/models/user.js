const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  placeName: {
    type: String,
    required: true
  },
  businessId: {
    type: String, 
    required: false
  },
  idNumber: {
    type: String, // מספר תעודת זהות
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending',
  },
  role: {
    type: String,
    enum: ['admin', 'user'], // אפשרויות תפקיד
    default: 'user', // ברירת מחדל: משתמש רגיל
  },
  businessCertificate: {
    type: String, // נתיב לקובץ תעודת עוסק שנשמר בשרת
    required: true
  },
  idDocument: {
    type: String, // נתיב לתמונה של תעודת זהות
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  placeLocation: {
    lat: {
      type: Number,
      required: true
    },
    lng: {
      type: Number,
      required: true
    }
},
});

module.exports = mongoose.model('User', UserSchema);
