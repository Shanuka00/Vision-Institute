const pool = require('../db');

// Model function to get schedules by vision ID
exports.getSchedulesByVisionId = async (visionId) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT roomid, r.courseid, c.name, r.day, r.date, starttime, endtime
            FROM roomallocation AS r
            INNER JOIN studentenroll AS s ON r.courseid = s.courseid
            INNER JOIN course AS c ON r.courseid = c.courseid
            WHERE s.visionid = ?;
        `;
        pool.query(query, [visionId], (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results);
        });
    });
};

// Model function to get schedules by vision ID
exports.getSchedulesByVisionIdTe = async (visionId) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT roomid, r.courseid, c.name, r.day, r.date, starttime, endtime
            FROM roomallocation AS r
            INNER JOIN course AS c ON r.courseid = c.courseid
            WHERE c.visionid = ?;
        `;
        pool.query(query, [visionId], (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results);
        });
    });
};