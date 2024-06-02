const { getCoursesByTeacherVisionId, getNotificationsByTeacherVisionId } = require('../models/loadTeCoursesModel');

// Controller function to get courses
const loadTeCourses = async (req, res) => {
  const { visionid } = req.query;
  try {
    const courses = await getCoursesByTeacherVisionId(visionid);
    res.status(200).json({ courses });
  } catch (error) {
    console.error('Error loading courses:', error);
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
};

// Controller function to get notifications
const loadTeNotifications = async (req, res) => {
  const { visionid } = req.query;
  try {
    const notifications = await getNotificationsByTeacherVisionId(visionid);
    res.status(200).json({ notifications });
  } catch (error) {
    console.error('Error loading notifications:', error);
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
};

module.exports = {
  loadTeCourses,
  loadTeNotifications,
};
