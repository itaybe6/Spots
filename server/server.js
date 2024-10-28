const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const spotRoutes = require('./api/routes/spot');

// טוען את משתני הסביבה מקובץ .env
dotenv.config();

const app = express();

// הגדרת הפורט מהסביבה (אם לא מוגדר, יבחר 5000 כברירת מחדל)
const port = process.env.PORT || 5000;
console.log("Mongo URI:", process.env.MONGO_URI);

// התחברות ל-MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

// Middleware
app.use(express.json()); // מאפשר עבודה עם JSON בגוף הבקשות

// ניתוב ראשי לשרת (בדיקה)
app.get('/', (req, res) => {
    res.send('Server is running and connected to MongoDB');
});

// שימוש בנתיב עבור שמירת מקומות
app.use('/api', spotRoutes); // הוספת ה-routes של מקומות

// הפעלת השרת
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



