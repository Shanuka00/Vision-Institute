const pool = require('../db');

const getCoursesStFees = (visionid) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT DISTINCT c.courseid AS courseid, name, grade, monamount FROM studentenroll AS s INNER JOIN course AS c ON s.courseid = c.courseid WHERE s.visionid = ?';
    pool.query(query, [visionid], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });
};

const saveClassFees = ({ month, paidamount, state, date, visionid, courseid }) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO classfees (month, paidamount, state, date, visionid, courseid) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [month, paidamount, state, date, visionid, courseid];
    pool.query(query, values, (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });
};

module.exports = {
  getCoursesStFees,
  saveClassFees
};
