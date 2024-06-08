const pool = require('../db');

// Model function to create a new payment
const createPayment = async (month, date, amountpaid, note, courseid) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
            }

            const query = 'INSERT INTO payment (month, date, amountpaid, note, courseid) VALUES (?, ?, ?, ?, ?)';
            connection.query(query, [month, date, amountpaid, note, courseid], (error, results) => {
                connection.release();

                if (error) {
                    reject(error);
                }

                resolve(results.insertId);
            });
        });
    });
};

module.exports = {
    createPayment,
};
