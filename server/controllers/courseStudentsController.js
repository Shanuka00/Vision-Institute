const { getStudentsByCourseId } = require('../models/courseStudentsModel');

// Controller function to get students by course ID
exports.getStudentsByCourse = async (req, res) => {
    const { courseId } = req.query;
    try {
        const students = await getStudentsByCourseId(courseId);
        res.json({ students });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
