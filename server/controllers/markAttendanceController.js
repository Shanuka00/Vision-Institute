// server/controllers/markAttendanceController.js

const markAttendanceModel = require('../models/markAttendanceModel');

// Controller function to mark attendance
const markAttendance = async (req, res) => {
    try {
        // Extract data from request body
        const { visionid, courseid, date, monthName } = req.body;
        // Call model function to mark attendance
        const result = await markAttendanceModel.markAttendance(visionid, courseid, date, monthName);

        if (result.message === 'not enrolled') {
            res.status(400).json({ message: result.message });
        } else {
            res.status(201).json({ message: 'Attendance marked successfully', feesStatus: result.feesStatus });
        }
    } catch (error) {
        console.error('Error marking attendance:', error);
        res.status(500).json({ error: 'Internal server error', message: error.message });
    }
};

module.exports = {
    markAttendance
};
