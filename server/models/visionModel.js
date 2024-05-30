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


const addUser = async ({
    maxVisionId,
    firstName,
    lastName,
    initial,
    birthday,
    password,
    gender,
    emailAddress,
    mobilePhone,
    whatsappNumber,
    addressLine1,
    addressLine2,
    city,
    school,
    parentName,
    occupation,
    contactNo,
    aboutVision,
    role,
    state
}) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
            }
            
            const query = `
                INSERT INTO visionuser (
                    visionid, 
                    firstname, 
                    lastname, 
                    initial, 
                    dateofbirth, 
                    password, 
                    gender, 
                    email, 
                    mobilenumber, 
                    whatsappnumber, 
                    addressline1, 
                    addressline2, 
                    city, 
                    school, 
                    parentname, 
                    parentoccupation, 
                    parentcontact,  
                    howyouknow, 
                    role, 
                    state
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;
            
            connection.query(query, [maxVisionId, firstName, lastName, initial, birthday, password, gender, emailAddress, mobilePhone, whatsappNumber, addressLine1, addressLine2, city, school, parentName, occupation, contactNo, aboutVision, role, state], (error, results) => {
                connection.release(); // Release the connection when done
                
                if (error) {
                    reject(error);
                }
                
                resolve(results);
            });
        });
    });
};


// Function to get a user by their Vision ID
const getUserByVisionId = async (visionId) => {
    try {

        // Perform a database query to find the user with the given Vision ID
        const query = 'SELECT * FROM visionuser WHERE visionid = ?';
        const result = await pool.query(query, [visionId]);

        const rows = result;

        return rows; // Assuming Vision ID is unique, return the first row
    } catch (error) {
        console.error('Error fetching user by Vision ID:', error);
        throw error;
    }
};

// Function to update a user's password and state
const updatePasswordAndState = async (visionId, encryptedPassword, newState) => {
    try {
        // Perform a database query to update the user's password and state
        const query = 'UPDATE visionuser SET password = ?, state = ? WHERE visionid = ?';
        await pool.query(query, [encryptedPassword, newState, visionId]);
    } catch (error) {
        console.error('Error updating password and state:', error);
        throw error;
    }
};


const getStudentById = (visionId) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT visionid, firstname, lastname FROM visionuser WHERE visionid = ? AND PASSWORD = '7a81ef6b1c3c393b522a0b3a609de0e9'";
        pool.query(query, [visionId], (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results);
        });
    });
};


module.exports = {
    addUser,
    getMaxVisionId,
    getStudentById,
    getUserByVisionId,
    updatePasswordAndState
};
