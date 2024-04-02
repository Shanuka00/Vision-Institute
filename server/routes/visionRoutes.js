const express = require('express');
const router = express.Router();
const visionController = require('../controllers/visionController');

// Route to fetch the maximum vision ID
router.get('/maxVisionId', visionController.getMaxVisionId);

// Route to add a new user
router.post('/addUser', visionController.addUser);

module.exports = router;
