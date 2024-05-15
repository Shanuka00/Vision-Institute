const Room = require('../models/loadroomsModel');

// Controller function to get all classrooms
exports.getAllClassrooms = async (req, res) => {
    try {
        const classrooms = await Room.getAllClassrooms();
        res.json(classrooms);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};