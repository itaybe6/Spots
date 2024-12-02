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
  businessId: {
    type: String, 
    required: false
  },
  idNumber: {
    type: String, // מספר תעודת זהות
    required: true
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
  }
});

module.exports = mongoose.model('User', UserSchema);
