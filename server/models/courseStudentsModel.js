const pool = require('../db');

// Model function to get students by course ID
exports.getStudentsByCourseId = async (courseId) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT v.visionid, v.firstname, v.lastname, v.gender, v.city
            FROM visionuser AS v
            INNER JOIN studentenroll AS s ON v.visionid = s.visionid
            WHERE s.courseid = ?
        `;
        pool.query(query, [courseId], (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results);
        });
    });
};
