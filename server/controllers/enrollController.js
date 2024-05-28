const enrollModel = require('../models/enrollModel');

const getGrades = (req, res) => {
    enrollModel.getGrades()
        .then(grades => {
            res.status(200).json(grades);
        })
        .catch(error => {
            res.status(500).json({ message: "Error fetching grades", error });
        });
};

const getCourses = (req, res) => {
    const { grade } = req.query;
    enrollModel.getCourses(grade)
        .then(courses => {
            res.status(200).json(courses);
        })
        .catch(error => {
            res.status(500).json({ message: "Error fetching courses", error });
        });
};

const enrollStudent = (req, res) => {
    const { visionid, courseid, date } = req.body;
    enrollModel.enrollStudent(visionid, courseid, date)
        .then(() => {
            res.status(200).json({ message: "Enrollment successful" });
        })
        .catch(error => {
            res.status(500).json({ message: "Enrollment failed", error });
        });
};

module.exports = {
    getGrades,
    getCourses,
    enrollStudent
};
