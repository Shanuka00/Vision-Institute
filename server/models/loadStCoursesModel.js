const pool = require('../db');

// Model function to get courses by student visionid
const getCoursesByStudentVisionId = async (visionid) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT s.courseid, c.subject, c.grade, v.firstname, v.lastname
      FROM studentenroll AS s
      INNER JOIN course AS c ON s.courseid = c.courseid
      INNER JOIN visionuser AS v ON c.visionid = v.visionid
      WHERE s.visionid = ?;
    `;
    pool.query(query, [visionid], (error, results) => {
      if (error) {
        return reject(error);
      }
      const courses = results.map(row => ({
        courseid: row.courseid,
        subject: row.subject,
        grade: row.grade,
        teacher: `${row.firstname} ${row.lastname}`,
      }));
      resolve(courses);
    });
  });
};

// Model function to get notifications by student visionid
const getNotificationsByStudentVisionId = async (visionid) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT attendance.courseid, DATE, name
      FROM attendance INNER JOIN course ON attendance.courseid = course.courseid
      WHERE attendance.visionid = ? AND seen = 0;
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
  getCoursesByStudentVisionId,
  getNotificationsByStudentVisionId,
};
