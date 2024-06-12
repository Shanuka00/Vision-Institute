const courseModel = require('../models/courseModel');

// Controller function to fetch course details by course ID
const getCourseDetails = async (req, res) => {
    try {
        const { courseId } = req.params;
        const courseDetails = await courseModel.getCourseDetails(courseId);
        if (courseDetails) {
            res.json(courseDetails);
        } else {
            res.status(404).json({ error: 'Course not found' });
        }
    } catch (error) {
        console.error('Error fetching course details:', error);
        res.status(500).json({ error: 'Internal server error', message: error.message });
    }
};

const updateCourseDetails = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { name, monamount, payscheme } = req.body;
        const result = await courseModel.updateCourseDetails(courseId, name, monamount, payscheme);

        if (result.affectedRows > 0) {
            res.json({ message: 'Course updated successfully' });
        } else {
            res.status(404).json({ error: 'Course not found or no changes made' });
        }
    } catch (error) {
        console.error('Error updating course details:', error);
        res.status(500).json({ error: 'Internal server error', message: error.message });
    }
};

module.exports = {
    getCourseDetails,
    updateCourseDetails
};
