const pool = require('../db');

// Model function to get all classrooms
exports.getAllClassrooms = async () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM classroom', (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results);
        });
    });
};