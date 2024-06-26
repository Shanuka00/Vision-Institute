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
const { getStudentsByCourse } = require('../controllers/courseStudentsController');
const { checkStudentState, markAsFreeCard, removeFreeCard, resetPassword } = require('../controllers/studentFreeResetController');
const expenseHandleController = require('../controllers/expenseHandleController');
const newPaymentController = require('../controllers/newPaymentController');
const courseController = require('../controllers/courseController');
const loadOverFinController = require('../controllers/loadOverFinController');
const loadAttndRecController = require('../controllers/loadAttndRecController');

const router = express.Router();

// Route to fetch the maximum vision ID
router.get('/maxVisionId', visionController.getMaxVisionId);

// Route to fetch the maximum vision ID and Register (teacher)
router.post('/registerTeacher', visionController.registerTeacher);

// Route to fetch the maximum vision ID and Register (admin)
router.post('/registerAdmin', visionController.registerAdmin);

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

// Route to get students by course ID
router.get('/studentsInCourse', getStudentsByCourse);

// Route to mark a student as free card and reset password
router.get('/checkStudentState', checkStudentState);
router.post('/markAsFreeCard', markAsFreeCard);
router.post('/removeFreeCard', removeFreeCard);
router.post('/resetPassword', resetPassword);

// Route to handle expenses
router.get('/getteachersEx', expenseHandleController.getTeachers);
router.get('/getcoursesEx/:visionid', expenseHandleController.getCourses);
router.post('/addexpenseEx', expenseHandleController.addExpense);

// Route to handle new payment
router.post('/newMonPayment', newPaymentController.createPayment);

// Fetch course details by course ID
router.get('/course/:courseId', courseController.getCourseDetails);

// Update course details by course ID
router.put('/course/:courseId', courseController.updateCourseDetails);

// Route to load overall finance data
router.get('/finance/collection', loadOverFinController.getOverallCollection);
router.get('/finance/expenses', loadOverFinController.getOverallExpenses);
router.get('/finance/paid', loadOverFinController.getOverallPaid);

// Define the route for loading attendance records
router.get('/loadattendance', loadAttndRecController.loadAttendanceRecords);


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
