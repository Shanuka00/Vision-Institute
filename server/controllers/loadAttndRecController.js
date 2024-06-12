const loadAttndRecModel = require('../models/loadAttndRecModel');

const loadAttendanceRecords = async (req, res) => {
  try {
    const { courseid, date } = req.query;
    const students = await loadAttndRecModel.getAttendanceRecords(courseid, date);
    res.status(200).json(students);
  } catch (error) {
    console.error('Error fetching attendance records:', error);
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
};

module.exports = {
  loadAttendanceRecords
};
