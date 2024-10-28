// const Spot = require('../models/spot');

// async function savePlacesToDatabase(places) {
//   try {
//     const savedPlaces = [];

//     for (const place of places) {
//       const newSpot = new Spot({
//         name: place.name,
//         placeId: place.place_id,
//         location: {
//           lat: place.location.lat,
//           lng: place.location.lng,
//         },
//         type: place.type, // ודא שהסוג תואם ל-enum שהגדרת
//         rating: place.rating || 0, // אם אין דירוג, שמור 0 כברירת מחדל
//         photo: place.photo || "", // במידה ואין תמונה
//         allTypes: place.allTypes || [],
//         reviews: place.reviews || []
//       });

//       const savedSpot = await newSpot.save();
//       savedPlaces.push(savedSpot);
//     }

//     return savedPlaces;
//   } catch (error) {
//     console.error("Error saving places to database:", error);
//     throw error;
//   }
// }

// module.exports = { savePlacesToDatabase };



const Spot = require('../models/spot'); // ודא שהנתיב נכון למודל שלך

const savePlacesToDatabase = async (places) => {
  try {
    const savedPlaces = [];
    for (const place of places) {
      const newSpot = new Spot({
        name: place.name,
        placeId: place.place_id,
        location: {
          lat: place.geometry.location.lat,
          lng: place.geometry.location.lng,
        },
        type: place.types[0], // נניח שהסוג הראשון הוא העיקרי
        rating: place.rating || 0,
        photo: place.photoUrl || "", // השתנה מ-photo ל-photoUrl
        allTypes: place.types, // שימוש במערך של סוגים
        reviews: place.reviews || [] // במידה ויש ביקורות
      });

      const savedSpot = await newSpot.save();
      savedPlaces.push(savedSpot);
    }
    return savedPlaces;
  } catch (error) {
    console.error('Error saving places:', error); // הוספת לוג לשגיאות
    throw new Error('Failed to save places to database');
  }
};

module.exports = {
  savePlacesToDatabase,
};
