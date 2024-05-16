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


// Controller function to get all courses with additional details
exports.getAllCoursesWithDetails = async (req, res) => {
    try {
        const courses = await roomAllocationModel.getAllCoursesWithDetails();
        res.json(courses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};


// Controller function to allocate a classroom to a course
exports.allocateClassroomToCourse = async (req, res) => {
    try {
        const { roomid, courseid, day, date, starttime, endtime } = req.body;
        // Check if day or date is empty, set default values accordingly
        const dayValue = day ? day : 'no';
        const dateValue = date ? date : '0000-00-00';
        const result = await roomAllocationModel.allocateClassroomToCourse(roomid, courseid, dayValue, dateValue, starttime, endtime);
        res.json({ message: "Classroom allocated successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};


// Controller function to get all room allocations
exports.getAllRoomAllocations = async (req, res) => {
    try {
        const roomAllocations = await roomAllocationModel.getAllRoomAllocations();
        res.json(roomAllocations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Controller function to delete a room allocation
exports.deleteRoomAllocation = async (req, res) => {
    const { roomId, courseId, day, date, startTime, endTime } = req.params;
    try {
        await roomAllocationModel.deleteRoomAllocation(roomId, courseId, day, date, startTime, endTime);
        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};