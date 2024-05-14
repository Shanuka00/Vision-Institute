const roomModel = require('../models/roomModel');

const getNextClassroomID = async (req, res) => {
    try {
        const result = await roomModel.getNextClassroomID();
        const prefix = result.match(/[A-Za-z]+/)[0]; // Extract the prefix dynamically
        const currentId = result.slice(prefix.length); // Extract numeric part after the prefix
        const nextId = parseInt(currentId) + 1; // Increment the numeric part
        const nextRoomId = `${prefix}${nextId}`; // Concatenate the prefix with the incremented numeric part
        res.json({ roomId: nextRoomId });
    } catch (err) {
        console.error('Error fetching room IDs:', err);
        res.status(500).json({ error: 'Internal server error', message: err.message });
    }
};

module.exports = {
  getNextClassroomID,
};
