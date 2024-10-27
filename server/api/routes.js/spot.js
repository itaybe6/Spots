const express = require('express');
const router = express.Router();
const { createSpot} = require('../controller/spot');

router.post('/', createSpot);

module.exports = router;
