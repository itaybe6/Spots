const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    placeName: {
        type: String,
        required: true
    }, // שם המקום
    eventType: {
        type: String,
        required: true
    }, // סוג האירוע
    dateTime: {
        type: Date,
        required: true
    }, // תאריך ושעה
    eventTitle: {
        type: String,
        required: true
    }, // כותרת לאירוע
    eventDescription: {
        type: String,
        required: true
    }, // תיאור האירוע
    image: {
        type: String,
        required: false
    } ,// תמונה (נתיב לתמונה או URL)
    link: {
        type: String,
        required: false
    } , 
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

module.exports = mongoose.model('Event', EventSchema);
