const newPaymentModel = require('../models/newPaymentModel');

// Controller function to create a new payment
const createPayment = async (req, res) => {
    try {
        const { month, date, amountpaid, note, courseid } = req.body;

        // Call model function to create a new payment record
        const newPayment = await newPaymentModel.createPayment(month, date, amountpaid, note, courseid);

        // Send response
        res.status(201).json({ message: 'Payment recorded successfully' });
    } catch (error) {
        console.error('Error recording payment:', error);
        res.status(500).json({ error: 'Internal server error', message: error.message });
    }
};

module.exports = {
    createPayment,
};
