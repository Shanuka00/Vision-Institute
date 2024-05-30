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

const getStudents = (req, res) => {
    const { course } = req.query;
    enrollModel.getStudents(course)
        .then(students => {
            res.status(200).json(students);
        })
        .catch(error => {
            res.status(500).json({ message: "Error fetching students", error });
        });
};

const getClassFee = (req, res) => {
    const { course } = req.query;
    enrollModel.getClassFee(course)
        .then(students => {
            res.status(200).json(students);
        })
        .catch(error => {
            res.status(500).json({ message: "Error fetching classfee", error });
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

const clzFeesPaid = (req, res) => {
    const { month, amount, state, date, visionid, courseid } = req.body;
    enrollModel.clzFeesPaid(month, amount, state, date, visionid, courseid)
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
    getStudents,
    getClassFee,
    enrollStudent,
    clzFeesPaid
};
