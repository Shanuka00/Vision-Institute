const pool = require('../db');

const getOverallCollection = async (month, year) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT SUM(paidamount) AS collection FROM classfees WHERE MONTH='${month}' AND DATE LIKE '${year}%';`,
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0].collection);
        }
      }
    );
  });
};

const getOverallExpenses = async (month, year) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT SUM(amount) AS expenses FROM expense WHERE MONTH='${month}';`,
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0].expenses);
        }
      }
    );
  });
};

const getOverallPaid = async (month, year) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT SUM(amountpaid) AS paid FROM payment WHERE MONTH='${month}' AND DATE LIKE '${year}%';`,
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0].paid);
        }
      }
    );
  });
};

module.exports = {
  getOverallCollection,
  getOverallExpenses,
  getOverallPaid
};
