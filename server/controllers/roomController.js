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

// Controller function to create a new classroom
const createClassroom = async (req, res) => {
    try {
        // Extract data from request body
        const { maxcapacity, withac, roomid } = req.body;
        // Call model function to create a new classroom
        const newClassroom = await roomModel.createClassroom(maxcapacity, withac, roomid);
        // Send response
        res.status(201).json({ message: 'New classroom created successfully' });
    } catch (error) {
        console.error('Error creating classroom:', error);
        res.status(500).json({ error: 'Internal server error', message: error.message });
    }
};


module.exports = {
  getNextClassroomID,
  createClassroom
};
