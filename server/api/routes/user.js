const express = require('express');
const router = express.Router();
const { verifyBusiness, login } = require('../controller/user');
const multer = require('multer');

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

module.exports = router;
