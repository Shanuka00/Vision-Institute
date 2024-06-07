const expenseHandleModel = require('../models/expenseHandleModel');
const moment = require('moment');

const getTeachers = async (req, res) => {
    try {
        const teachers = await expenseHandleModel.getTeachers();
        res.status(200).json(teachers);
    } catch (error) {
        console.error('Error fetching teachers:', error);
        res.status(500).json({ error: 'Internal server error', message: error.message });
    }
};

const getCourses = async (req, res) => {
    try {
        const { visionid } = req.params;
        const courses = await expenseHandleModel.getCourses(visionid);
        res.status(200).json(courses);
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({ error: 'Internal server error', message: error.message });
    }
};

const addExpense = async (req, res) => {
    try {
        const { courseid, amount, reason } = req.body;
        const month = moment().format('MMMM'); // current month
        await expenseHandleModel.addExpense(courseid, amount, reason, month);
        res.status(201).json({ message: 'Expense added successfully' });
    } catch (error) {
        console.error('Error adding expense:', error);
        res.status(500).json({ error: 'Internal server error', message: error.message });
    }
};

module.exports = {
    getTeachers,
    getCourses,
    addExpense
};
