const pool = require('../db');

const getTeachers = () => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT visionid, firstname, lastname FROM visionuser WHERE visionid LIKE 'VT%'", (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
};

const getCourses = (visionid) => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT courseid, subject, grade, name FROM course WHERE visionid = ?", [visionid], (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
};

const addExpense = (courseid, amount, reason, month) => {
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO expense (month, amount, reason, courseid) VALUES (?, ?, ?, ?)";
        pool.query(query, [month, amount, reason, courseid], (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
};

module.exports = {
    getTeachers,
    getCourses,
    addExpense
};
