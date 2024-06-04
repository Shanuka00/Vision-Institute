// server/models/markAttendanceModel.js

const pool = require('../db');

// Model function to mark attendance
const markAttendance = async (visionId, courseId, date, monthName) => {
    return new Promise((resolve, reject) => {
        pool.getConnection(async (err, connection) => {
            if (err) {
                return reject(err);
            }

            try {
                // Check if the student is enrolled in the course
                const enrollQuery = 'SELECT * FROM studentenroll WHERE visionid = ? AND courseid = ?';
                const enrollResult = await new Promise((resolve, reject) => {
                    connection.query(enrollQuery, [visionId, courseId], (error, results) => {
                        if (error) return reject(error);
                        resolve(results);
                    });
                });

                if (enrollResult.length === 0) {
                    connection.release();
                    return resolve({ message: 'not enrolled' });
                }

                // Check if the student is in the visionuser table and get the state
                const userQuery = 'SELECT state FROM visionuser WHERE visionid = ?';
                const userResult = await new Promise((resolve, reject) => {
                    connection.query(userQuery, [visionId], (error, results) => {
                        if (error) return reject(error);
                        resolve(results);
                    });
                });

                let feesStatus = 'paid';
                if (userResult.length > 0 && userResult[0].state === 'free') {
                    feesStatus = 'free';
                } else {
                    // Check if the student has paid the class fees for the month and the state is not "reject"
                    const feesQuery = 'SELECT * FROM classfees WHERE visionid = ? AND courseid = ? AND month = ?';
                    const feesResult = await new Promise((resolve, reject) => {
                        connection.query(feesQuery, [visionId, courseId, monthName], (error, results) => {
                            if (error) return reject(error);
                            resolve(results);
                        });
                    });

                    if (feesResult.length === 0 || feesResult.some(fee => fee.state === 'reject')) {
                        feesStatus = 'no classfees';
                    }
                }

                // Insert attendance record into the database
                const attendanceQuery = 'INSERT INTO attendance (visionid, courseid, date) VALUES (?, ?, ?)';
                const attendanceResult = await new Promise((resolve, reject) => {
                    connection.query(attendanceQuery, [visionId, courseId, date], (error, results) => {
                        if (error) return reject(error);
                        resolve(results);
                    });
                });

                connection.release();
                resolve({ message: 'Attendance marked successfully', feesStatus });
            } catch (error) {
                connection.release();
                reject(error);
            }
        });
    });
};

module.exports = {
    markAttendance
};
