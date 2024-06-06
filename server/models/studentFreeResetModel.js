// const pool = require('../db');

// // Model function to update student state
// exports.updateStudentState = (visionid, state) => {
//     return new Promise((resolve, reject) => {
//         const query = `
//             UPDATE visionuser
//             SET state = ?
//             WHERE visionid = ?
//         `;
//         pool.query(query, [state, visionid], (error, results) => {
//             if (error) {
//                 reject(error);
//             }
//             resolve(results);
//         });
//     });
// };

// // Model function to update student password
// exports.updateStudentPassword = (visionid, password) => {
//     return new Promise((resolve, reject) => {
//         const query = `
//             UPDATE visionuser
//             SET password = ?
//             WHERE visionid = ?
//         `;
//         pool.query(query, [password, visionid], (error, results) => {
//             if (error) {
//                 reject(error);
//             }
//             resolve(results);
//         });
//     });
// };


const pool = require('../db');

// Model function to get student state
exports.getStudentState = (visionid) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT state
            FROM visionuser
            WHERE visionid = ?
        `;
        pool.query(query, [visionid], (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results[0]?.state);
        });
    });
};

// Model function to update student state
exports.updateStudentState = (visionid, state) => {
    return new Promise((resolve, reject) => {
        const query = `
            UPDATE visionuser
            SET state = ?
            WHERE visionid = ?
        `;
        pool.query(query, [state, visionid], (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results);
        });
    });
};

// Model function to update student password
exports.updateStudentPassword = (visionid, password) => {
    return new Promise((resolve, reject) => {
        const query = `
            UPDATE visionuser
            SET password = ?
            WHERE visionid = ?
        `;
        pool.query(query, [password, visionid], (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results);
        });
    });
};
