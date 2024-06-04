const express = require('express');
const visionController = require('../controllers/visionController');
const roomController = require('../controllers/roomController');
const { validateUser } = require('../controllers/userController');
const { getAllClassrooms } = require('../controllers/loadroomsController');
const { searchForAllocateDay, searchForAllocateDate, getAllCoursesWithDetails, allocateClassroomToCourse, getAllRoomAllocations, deleteRoomAllocation } = require('../controllers/roomAllocationController');
const stprofileController = require('../controllers/stprofileController');
const { getQRCode } = require('../controllers/stQrController');
const outsideMessagesController = require('../controllers/outsideMessagesController');
const feesController = require('../controllers/feesController');
const registrationsController = require('../controllers/registrationsController');
const { getGrades, getCourses, getStudents, enrollStudent, getClassFee, clzFeesPaid } = require('../controllers/enrollController');
const { getCoursesStFees, saveClassFees } = require('../controllers/classFeesStController');
const updateProfilesController = require('../controllers/updateProfilesController');
const newCourseRegController = require('../controllers/newCourseRegController');
const feespaymentsController = require('../controllers/feespaymentsController');
const { loadStCourses, loadStNotifications } = require('../controllers/loadStCoursesController');
const { loadTeCourses, loadTeNotifications } = require('../controllers/loadTeCoursesController');
const markAttendanceController = require('../controllers/markAttendanceController');
const paymentFromTeController = require('../controllers/paymentFromTeController');
const { getStudentSchedules, getTeacherSchedules } = require('../controllers/studentShedulesController');

const router = express.Router();

// Route to fetch the maximum vision ID
router.get('/maxVisionId', visionController.getMaxVisionId);

// Route to add a new user
router.post('/addUser', visionController.addUser);

// Route to update the password and state
router.post('/updatePasswordAndState', visionController.updatePasswordAndState);
router.post('/updatePasswordAndState2', visionController.updatePasswordAndState2);

// Login route
router.post('/login', validateUser);

// Route to handle contact form submission
router.post('/sendMessage', outsideMessagesController.sendMessage);

// Route to fetch already registered student
router.get('/fetchAlreadyStudent', visionController.getStudentById);

// Update user profiles
router.post('/updateStudentProfile', updateProfilesController.updateStProfile);


// ======================== Admin routes ===============================

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

// Route to fetch new messages from outside
router.get('/outsideMessages', outsideMessagesController.getOutsideMessages);

// Route to mark a message as seen
router.post('/markAsSeenOM', outsideMessagesController.markMessageAsSeen);

// Route to fetch current registration fees value
router.get('/currentFeesLoad', feesController.getCurrentFees);

// Route to update registration fees value
router.post('/updateFeesReg', feesController.updateFees);

// Route to handle new online registrations
router.get('/newOnRegistrations', registrationsController.getRegistrations);
router.post('/approveRegistration', registrationsController.approveRegistration);
router.post('/rejectRegistration', registrationsController.rejectRegistration);

// Route to new course enrollments and classfees
router.get('/grades', getGrades);
router.get('/courses', getCourses);
router.get('/studentsForFees', getStudents);
router.get('/classFeeFetch', getClassFee);
router.post('/enroll', enrollStudent);
router.post('/payClzFees', clzFeesPaid);

// Route to register new course
router.get('/nextcourseid', newCourseRegController.getNextCourseId);
router.get('/teachers', newCourseRegController.getTeachers);
router.post('/newCourseRegistration', newCourseRegController.registerNewCourse);

// Route to online classfees payments
router.get('/newOnFeesPayments', feespaymentsController.getFeesPayments);
router.post('/approveFeesPayment', feespaymentsController.approveFeesPayment);
router.post('/rejectFeesPayment', feespaymentsController.rejectFeesPayment);

// Route to mark student attendance
router.post('/markAttendance', markAttendanceController.markAttendance);


// ====================== Student routes ===============================

// Route to load student profile by vision ID
router.post('/profileByVisionId', stprofileController.getProfileByVisionId);

// Route to get QR code
router.get('/qrcodeFetch', getQRCode);

// Routes to pay class fees
router.get('/coursesOfSt', getCoursesStFees);
router.post('/classfeesSt', saveClassFees);

// Route to load courses
router.get('/loadStCourses', loadStCourses);

// Route to load notifications
router.get('/loadStNotifications', loadStNotifications);

// Route to mark a message as seen
router.post('/markAsSeenSt', outsideMessagesController.markMessageAsSeenSt);

// Route to get student schedules by vision ID
router.get('/studentSchedules/:visionId', getStudentSchedules);


// ====================== Teacher routes ===============================

// Route to load courses
router.get('/loadTeCourses', loadTeCourses);

// Route to load notifications
router.get('/loadTeNotifications', loadTeNotifications);

// Route to mark a message as seen
router.post('/markAsSeenTe', outsideMessagesController.markMessageAsSeenTe);

// Load collection and payscheme
router.post('/paymentFromTe', paymentFromTeController.fetchPayments);

// Route to get teacher schedules by vision ID
router.get('/teacherSchedules/:visionId', getTeacherSchedules);

module.exports = router;
