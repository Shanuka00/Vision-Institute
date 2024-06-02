const pool = require('../db');

// Model function to get courses by student visionid
const getCoursesByTeacherVisionId = async (visionid) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT courseid, subject, grade, name
      FROM course
      WHERE visionid = ?;
    `;
    pool.query(query, [visionid], (error, results) => {
      if (error) {
        return reject(error);
      }
      const courses = results.map(row => ({
        courseid: row.courseid,
        subject: row.subject,
        grade: row.grade,
        name: row.name,
      }));
      resolve(courses);
    });
  });
};

// Model function to get notifications by student visionid
const getNotificationsByTeacherVisionId = async (visionid) => {
  return new Promise((resolve, reject) => {
    const query = `
        SELECT expenseid, month, amount, reason, seen, e.courseid, grade, subject, name
        FROM expense AS e
        INNER JOIN course AS c ON c.courseid = e.courseid
        WHERE c.visionid = ? AND e.seen = 0;
    `;
    pool.query(query, [visionid], (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve(results);
    });
  });
};

module.exports = {
  getCoursesByTeacherVisionId,
  getNotificationsByTeacherVisionId,
};
