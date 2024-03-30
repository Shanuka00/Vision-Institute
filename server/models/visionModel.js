const pool = require('../db');

const getMaxVisionId = async () => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
            }
            
            connection.query("SELECT max(visionid) AS vid FROM visionuser WHERE visionid LIKE 'VS%'", (error, results) => {
                connection.release();
                
                if (error) {
                    reject(error);
                }
                
                // Extract the visionid (vid) from the result
                const visionId = results[0].vid;
                resolve(visionId);
            });
        });
    });
};

module.exports = {
    getMaxVisionId
};
