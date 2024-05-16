const express = require('express');
const visionController = require('../controllers/visionController');
const roomController = require('../controllers/roomController');
const { validateUser } = require('../controllers/userController');
const { getAllClassrooms } = require('../controllers/loadroomsController');
const { searchForAllocateDay, searchForAllocateDate, getAllCoursesWithDetails, allocateClassroomToCourse, getAllRoomAllocations, deleteRoomAllocation } = require('../controllers/roomAllocationController');

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

// Create a new classroom
router.post('/searchforallocateday', searchForAllocateDay);

// Create a new classroom
router.post('/searchforallocatedate', searchForAllocateDate);

// Route to get all courses with additional details
router.get('/getAllCoursesWithDetails', getAllCoursesWithDetails);

// Route to allocate a classroom to a course
router.post('/allocateClassroomToCourse', allocateClassroomToCourse);

// Route to get all room allocations
router.get('/getAllRoomAllocations', getAllRoomAllocations);

// Route to delete a room allocation
router.delete('/deleteRoomAllocation/:roomId/:courseId/:day/:date/:startTime/:endTime', deleteRoomAllocation);

module.exports = router;
