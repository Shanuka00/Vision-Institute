const classFeesStModel = require('../models/classFeesStModel');

const getCoursesStFees = (req, res) => {
  const { visionid } = req.query;
  classFeesStModel.getCoursesStFees(visionid)
    .then(courses => {
      res.status(200).json(courses);
    })
    .catch(error => {
      res.status(500).json({ message: "Error fetching courses", error });
    });
};

const saveClassFees = (req, res) => {
  const { month, paidamount, state, date, visionid, courseid } = req.body;
  classFeesStModel.saveClassFees({ month, paidamount, state, date, visionid, courseid })
    .then(() => {
      res.status(201).json({ message: "Payment recorded successfully" });
    })
    .catch(error => {
      res.status(500).json({ message: "Error recording payment", error });
    });
};

module.exports = {
  getCoursesStFees,
  saveClassFees
};
