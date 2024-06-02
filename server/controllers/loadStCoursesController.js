const { getCoursesByStudentVisionId, getNotificationsByStudentVisionId } = require('../models/loadStCoursesModel');

// Controller function to get courses
const loadStCourses = async (req, res) => {
  const { visionid } = req.query;
  try {
    const courses = await getCoursesByStudentVisionId(visionid);
    res.status(200).json({ courses });
  } catch (error) {
    console.error('Error loading courses:', error);
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
};

// Controller function to get notifications
const loadStNotifications = async (req, res) => {
  const { visionid } = req.query;
  try {
    const notifications = await getNotificationsByStudentVisionId(visionid);
    res.status(200).json({ notifications });
  } catch (error) {
    console.error('Error loading notifications:', error);
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
};

module.exports = {
  loadStCourses,
  loadStNotifications,
};
