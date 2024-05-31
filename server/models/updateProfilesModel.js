// server/models/updateProfilesModel.js

const pool = require('../db');

// Model function to update student profile
const updateStudentProfile = async (profile) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
            }

            // SQL query to update student profile
            const query = `
                UPDATE visionuser SET
                    firstname = ?,
                    lastname = ?,
                    initial = ?,
                    dateofbirth = ?,
                    password = ?,
                    gender = ?,
                    email = ?,
                    mobilenumber = ?,
                    whatsappnumber = ?,
                    addressline1 = ?,
                    addressline2 = ?,
                    city = ?,
                    school = ?,
                    parentname = ?,
                    parentoccupation = ?,
                    parentcontact = ?,
                    howyouknow = ?,
                    role = ?,
                    state = ?
                WHERE visionid = ?`;

            const {
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
            } = profile;

            connection.query(query, [
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
                state,
                visionid
            ], (error, results) => {
                connection.release();

                if (error) {
                    reject(error);
                }

                resolve(profile);
            });
        });
    });
};

module.exports = {
    updateStudentProfile
};
