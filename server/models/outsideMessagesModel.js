const pool = require('../db');

// Model function to save the message
exports.saveMessage = async (name, email, mobile, message) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO outmsg (name, email, mobile, message) VALUES (?, ?, ?, ?)';
        pool.query(query, [name, email, mobile, message], (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results);
        });
    });
};
