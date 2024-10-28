// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');

// // טוען את משתני הסביבה מהקובץ .env
// dotenv.config();

// // יצירת אפליקציה חדשה של Express
// const app = express();

// // הגדרת הפורט (מוגדר ב-.env)
// const port = process.env.PORT || 5000;

// // חיבור ל-MongoDB באמצעות Mongoose
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log('Connected to MongoDB'))
//   .catch((err) => console.error('Error connecting to MongoDB:', err));

// // הוספת ראוט בסיסי לבדיקה
// app.get('/', (req, res) => {
//   res.send('Server is running and connected to MongoDB');
// });

// // הפעלת השרת
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const spotRoutes = require('./api/routes/spot'); // בדוק שהנתיב נכון

const app = express();

// אפשרות ל-CORS
app.use(cors());
app.use(express.json());

// URI של MongoDB Atlas
const mongoURI = 'mongodb+srv://itay:Itay6236045@cluster0.n474g.mongodb.net/hotspots?retryWrites=true&w=majority&appName=Cluster0';

// התחברות ל-MongoDB Atlas
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch((err) => {
  console.error('Failed to connect to MongoDB Atlas', err);
});

// שימוש ב-router
app.use('/api', spotRoutes); // זו הדרך להוסיף את ה-router

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
