// server/models/userModel.js

const pool = require('../db');

class User {
    // Fetches user data by visionID

    static findByVisionId(visionId, callback) {
        pool.query('SELECT * FROM visionuser WHERE visionid = ?', [visionId], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            if (results.length > 0) {
                callback(null, results[0]);
            } else {
                callback(null, null);
            }
        });
    }
}

module.exports = User;
