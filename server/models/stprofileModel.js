const pool = require('../db');

class Profile {

    static findByVisionId(visionId, callback) {
        const query = `
            SELECT *
            FROM visionuser
            WHERE visionid = ?
        `;
        pool.query(query, [visionId], (err, results) => {
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

module.exports = Profile;
