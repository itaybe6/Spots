const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// טוען את משתני הסביבה מהקובץ .env
dotenv.config();

// יצירת אפליקציה חדשה של Express
const app = express();

// הגדרת הפורט (מוגדר ב-.env)
const port = process.env.PORT || 5000;

// חיבור ל-MongoDB באמצעות Mongoose
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// הוספת ראוט בסיסי לבדיקה
app.get('/', (req, res) => {
  res.send('Server is running and connected to MongoDB');
});

// הפעלת השרת
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
