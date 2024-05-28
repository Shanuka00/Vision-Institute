const pool = require('../db');

const getGrades = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT DISTINCT grade FROM course';
        pool.query(query, (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results);
        });
    });
};

const getCourses = (grade) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT DISTINCT courseid, subject, name FROM course WHERE grade = ?';
        pool.query(query, [grade], (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results);
        });
    });
};

const enrollStudent = (visionid, courseid, date) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO studentenroll (visionid, courseid, date) VALUES (?, ?, ?)';
        pool.query(query, [visionid, courseid, date], (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results);
        });
    });
};

module.exports = {
    getGrades,
    getCourses,
    enrollStudent
};
