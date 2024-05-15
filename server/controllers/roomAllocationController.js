const roomAllocationModel = require('../models/roomAllocationModel');

// Controller function to search for available classrooms for a day
exports.searchForAllocateDay = async (req, res) => {
    try {
        const { capacity, date, day, startTime, endTime } = req.body;
        const availableRooms = await roomAllocationModel.searchForAllocateDay(capacity, date, day, startTime, endTime);
        res.json(availableRooms);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};


// Controller function to search for available classrooms for date
exports.searchForAllocateDate = async (req, res) => {
    try {
        const { capacity, date, day, startTime, endTime } = req.body;
        const availableRooms = await roomAllocationModel.searchForAllocateDate(capacity, date, day, startTime, endTime);
        res.json(availableRooms);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};