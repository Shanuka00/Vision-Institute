// server/controllers/paymentFromTeController.js

const paymentFromTeModel = require('../models/paymentFromTeModel');

const fetchPayments = async (req, res) => {
  try {
    const course = req.body.course;
    const month = req.body.month;

    if (!course || !month) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const result = await paymentFromTeModel.fetchPayments(course, month);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
};

module.exports = {
  fetchPayments
};
