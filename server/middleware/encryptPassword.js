//server/middleware/encryptPassword.js

const crypto = require('crypto');

function encryptPassword(password) {
    const encryptedPassword = crypto.createHash('md5').update('vision' + password + '88').digest('hex');
    return encryptedPassword;
}

module.exports = encryptPassword;
