const pool = require('../db');

// Model function to search for available classrooms for a day
exports.searchForAllocateDay = async (capacity, date, day, startTime, endTime) => {
    return new Promise((resolve, reject) => {
        pool.query(
            `SELECT c.roomid, c.maxcapacity, c.withac
            FROM classroom c
            WHERE c.maxcapacity >= ? 
            AND c.roomid NOT IN (
                SELECT ra.roomid 
                FROM roomallocation ra
                WHERE ra.day = ? 
                AND (
                    (ra.starttime <= ? AND ra.endtime >= ?) 
                )
            );`,
            [capacity, day, startTime, endTime],
            (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            }
        );
    });
};


// Model function to search for available classrooms for date
exports.searchForAllocateDate = async (capacity, date, day, startTime, endTime) => {
    return new Promise((resolve, reject) => {
        pool.query(
            `SELECT c.roomid, c.maxcapacity, c.withac
            FROM classroom c
            WHERE c.maxcapacity >= ? 
            AND c.roomid NOT IN (
                SELECT ra.roomid 
                FROM roomallocation ra
                WHERE ra.date = ? 
                AND (
                    (ra.starttime <= ? AND ra.endtime >= ?) 
                )
            );`,
            [capacity, date, startTime, endTime],
            (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            }
        );
    });
};



// Model function to get all courses with additional details
exports.getAllCoursesWithDetails = async () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT courseid, subject, grade, name FROM course', (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results);
        });
    });
};


// Model function to allocate a classroom to a course
exports.allocateClassroomToCourse = async (roomid, courseid, day, date, starttime, endtime) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO roomallocation (roomid, courseid, day, date, starttime, endtime) VALUES (?, ?, ?, ?, ?, ?)', 
        [roomid, courseid, day, date, starttime, endtime], 
        (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results);
        });
    });
};


// Model function to get all room allocations
exports.getAllRoomAllocations = async () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM roomallocation', (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results);
        });
    });
};

// Model function to delete a room allocation
exports.deleteRoomAllocation = async (roomId, courseId, day, date, startTime, endTime) => {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM roomallocation WHERE roomid = ? AND courseid = ? AND day = ? AND date = ? AND starttime = ? AND endtime = ?', [roomId, courseId, day, date, startTime, endTime], (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results);
        });
    });
};