const express = require('express');
const visionController = require('../controllers/visionController');

const router = express.Router();

// Route to fetch the maximum vision ID
router.get('/maxVisionId', visionController.getMaxVisionId);

// Route to add a new user
router.post('/addUser', visionController.addUser);

// Route to update the password and state
router.post('/updatePasswordAndState', visionController.updatePasswordAndState);

module.exports = router;
