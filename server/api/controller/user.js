const User = require('../models/user'); // Ensure this path is correct
const bcrypt = require('bcrypt'); // For password hashing
const jwt = require('jsonwebtoken'); // For generating tokens

const path = require('path');


const verifyBusiness = async (req, res) => {
    try {
        const { email, password, idNumber, placeId ,placeName } = req.body;

        // בדיקה אם כל הקבצים הדרושים נשלחו
        if (!req.files || !req.files.businessDoc || !req.files.idDoc) {
            return res.status(400).json({ message: "Missing required documents" });
        }

        const businessDoc = req.files.businessDoc[0];
        const idDoc = req.files.idDoc[0];

        // שמירת נתיבי הקבצים בשרת
        const businessDocPath = path.join(__dirname, '../uploads', businessDoc.filename);
        const idDocPath = path.join(__dirname, '../uploads', idDoc.filename);

        // הצפנת הסיסמה
        const hashedPassword = await bcrypt.hash(password, 10); // 10 הוא ה-saltRounds (דרגת הקושי של ההצפנה)

        // יצירת משתמש חדש עם המידע שנשלח
        const newUser = new User({
            email,
            placeName,
            password: hashedPassword, // שמירת הסיסמה המוצפנת
            idNumber,
            businessCertificate: businessDocPath,
            idDocument: idDocPath, // הוספת הנתיב לתעודת הזהות
            businessId: placeId,
        });

        // שמירת המשתמש במסד הנתונים
        await newUser.save();

        res.status(201).json({ message: "Business verification submitted successfully" });
    } catch (error) {
        console.error("Error verifying business:", error);
        res.status(500).json({ message: "Error verifying business", error });
    }
};
// פונקציית התחברות
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // בדיקת קיום משתמש
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // בדיקת סיסמה
        const isPasswordValid = await bcrypt.compare(password, user.password); // הפונקציית הצפנה יודעת להשוות בין הסיסמא המוצפנת לסיסמא שהתקבלה 
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            'your_jwt_secret_key', // המפתח הסודי
            { expiresIn: '1h' } // תוקף הטוקן
          );
      
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error });
    }
};


const updateUserStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
  
      if (!['Approved', 'Rejected'].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }
  
      await User.findByIdAndUpdate(id, { status });
  
      res.status(200).json({ message: `User status updated to ${status}` });
    } catch (error) {
      console.error("Error updating user status:", error);
      res.status(500).json({ message: "Error updating user status", error });
    }
  };
  
  const getPendingUsers = async (req, res) => {
    try {
      const users = await User.find({ status: 'Pending' }, 'email idNumber businessCertificate idDocument');
      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching pending users:", error);
      res.status(500).json({ message: "Error fetching pending users" });
    }
  };
  

 
module.exports = {
    verifyBusiness,
    login,
    updateUserStatus,
    getPendingUsers ,
    
};
