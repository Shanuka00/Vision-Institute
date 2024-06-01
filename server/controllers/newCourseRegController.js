const newCourseRegModel = require('../models/newCourseRegModel');

exports.getNextCourseId = async (req, res) => {
    try {
        const nextCourseId = await newCourseRegModel.getNextCourseId();
        res.status(200).json({ nextcourseid: nextCourseId });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch next course ID' });
    }
};

exports.getTeachers = async (req, res) => {
    try {
        const teachers = await newCourseRegModel.getTeachers();
        res.status(200).json({ teachers });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch teachers' });
    }
};

exports.registerNewCourse = async (req, res) => {
    try {
        const { courseId, subject, grade, name, monamount, payscheme, teacher } = req.body;
        await newCourseRegModel.registerNewCourse(courseId, subject, grade, name, monamount, payscheme, teacher);
        res.status(201).json({ message: 'Course registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to register new course' });
    }
};
