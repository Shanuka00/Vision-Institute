const express = require('express');
const visionController = require('../controllers/visionController');
const roomController = require('../controllers/roomController');
const { validateUser } = require('../controllers/userController');
const { getAllClassrooms } = require('../controllers/loadroomsController');

const router = express.Router();

// Route to fetch the maximum vision ID
router.get('/maxVisionId', visionController.getMaxVisionId);

// Route to add a new user
router.post('/addUser', visionController.addUser);

// Route to update the password and state
router.post('/updatePasswordAndState', visionController.updatePasswordAndState);

// Login route
router.post('/login', validateUser);

// Load classrooms
router.get('/classrooms', getAllClassrooms);

// Get next class ID
router.get('/nextroomid', roomController.getNextClassroomID);

// Create a new classroom
router.post('/createclassroom', roomController.createClassroom);

module.exports = router;
