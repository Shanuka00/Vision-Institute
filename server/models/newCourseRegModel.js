const pool = require('../db');

exports.getNextCourseId = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT MAX(courseid) + 1 AS nextcourseid FROM course', (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results[0].nextcourseid);
            }
        });
    });
};

exports.getTeachers = () => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT visionid, firstname, lastname FROM visionuser WHERE visionid LIKE 'VT%'", (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

exports.registerNewCourse = (courseId, subject, grade, name, monamount, payscheme, teacher) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO course (courseid, subject, grade, name, monamount, payscheme, visionid) VALUES (?, ?, ?, ?, ?, ?, ?)';
        pool.query(query, [courseId, subject, grade, name, monamount, payscheme, teacher], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};
