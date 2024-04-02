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


module.exports = {
    addUser,
    getMaxVisionId
};
