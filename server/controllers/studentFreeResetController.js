const { updateStudentState, updateStudentPassword, getStudentState } = require('../models/studentFreeResetModel');

// Controller function to check student state
exports.checkStudentState = async (req, res) => {
    const { visionid } = req.query;
    try {
        const state = await getStudentState(visionid);
        res.json({ state });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Controller function to mark student as free card
exports.markAsFreeCard = async (req, res) => {
    const { visionid } = req.body;
    try {
        await updateStudentState(visionid, 'free');
        res.status(200).json({ message: 'Student marked as free card' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Controller function to remove free card from student
exports.removeFreeCard = async (req, res) => {
    const { visionid } = req.body;
    try {
        await updateStudentState(visionid, 'approved');
        res.status(200).json({ message: 'Student free card removed' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Controller function to reset student password
exports.resetPassword = async (req, res) => {
    const { visionid } = req.body;
    try {
        const newPassword = 'e4c4bcf6f1addc82e879fe8dbe1eddb3';
        await updateStudentPassword(visionid, newPassword);
        res.status(200).json({ message: 'Student password reset' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
