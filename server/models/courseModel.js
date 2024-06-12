const pool = require('../db');

// Model function to fetch course details by course ID
const getCourseDetails = async (courseId) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
            }
            const query = 'SELECT * FROM course WHERE courseid = ?';
            connection.query(query, [courseId], (error, results) => {
                connection.release();

                if (error) {
                    reject(error);
                }

                resolve(results[0]);
            });
        });
    });
};

const updateCourseDetails = async (courseId, name, monamount, payscheme) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
            }
            const query = 'UPDATE course SET name = ?, monamount = ?, payscheme = ? WHERE courseid = ?';
            connection.query(query, [name, monamount, payscheme, courseId], (error, results) => {
                connection.release();

                if (error) {
                    reject(error);
                }

                resolve(results);
            });
        });
    });
};

module.exports = {
    getCourseDetails,
    updateCourseDetails
};
