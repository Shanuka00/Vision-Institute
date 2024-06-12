const pool = require('../db');

const getAttendanceRecords = async (courseid, date) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
      }
      
      const query = `
        SELECT a.visionid, firstname, lastname, gender, city, mobilenumber
        FROM attendance AS a
        INNER JOIN visionuser AS v ON a.visionid = v.visionid
        WHERE a.courseid = ? AND a.date = ?;
      `;
      connection.query(query, [courseid, date], (error, results) => {
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
  getAttendanceRecords
};
