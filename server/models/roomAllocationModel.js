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
