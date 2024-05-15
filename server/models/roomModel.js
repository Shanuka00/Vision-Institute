const pool = require('../db');

const getNextClassroomID = async () => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
            }
            
            connection.query("SELECT MAX(roomid) AS rid FROM classroom;", (error, results) => {
                connection.release();
                
                if (error) {
                    reject(error);
                }
                
                // Extract the roomid (rid) from the result
                const roomId = results[0].rid;
                resolve(roomId);
            });
        });
    });
};


// Model function to create a new classroom
const createClassroom = async (maxCapacity, withAC, roomID) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
            }

            // SQL query to insert new classroom into the database
            const query = 'INSERT INTO classroom (roomid, maxcapacity, withac) VALUES (?, ?, ?)';
            connection.query(query, [roomID, maxCapacity, withAC], (error, results) => {
                connection.release();

                if (error) {
                    reject(error);
                }

                // Assuming roomId is auto-generated in the database
                const roomId = results.insertId;
                resolve({ roomId });
            });
        });
    });
};


module.exports = {
    getNextClassroomID,
    createClassroom
};