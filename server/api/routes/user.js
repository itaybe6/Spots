const express = require('express');
const router = express.Router();
const { verifyBusiness, login, getPendingUsers, updateUserStatus} = require('../controller/user');
const multer = require('multer');
const adminAuth = require('../middleware/adminAuth'); // ייבוא ה-Middleware

// הגדרת multer (במידה ואתה צריך להעלות קבצים)
const upload = multer({ dest: 'uploads/' });

// נתיב להרשמה
router.post(
    '/verify-business',
    upload.fields([
      { name: 'businessDoc', maxCount: 1 },
      { name: 'idDoc', maxCount: 1 },
    ]),
    verifyBusiness
  );
// נתיב להתחברות
router.post('/login', login);



// נתיב שליפת משתמשים עם סטטוס Pending עבור האדמין
router.get('/admin/pending-users', adminAuth, getPendingUsers);

// נתיב עדכון סטטוס משתמש (Approved או Rejected)
router.post('/admin/update-status/:id',adminAuth, updateUserStatus);

module.exports = router;
