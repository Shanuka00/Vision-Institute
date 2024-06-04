const { getSchedulesByVisionId, getSchedulesByVisionIdTe } = require('../models/studentShedulesModel');

// Controller function to get student schedules by vision ID
exports.getStudentSchedules = async (req, res) => {
    const { visionId } = req.params;
    try {
        const schedules = await getSchedulesByVisionId(visionId);
        res.json(schedules);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Controller function to get teacher schedules by vision ID
exports.getTeacherSchedules = async (req, res) => {
    const { visionId } = req.params;
    try {
        const schedules = await getSchedulesByVisionIdTe(visionId);
        res.json(schedules);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
