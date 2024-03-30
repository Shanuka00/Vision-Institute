const mysql = require('mysql');

// Database connection configuration
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'visionedu'
});

module.exports = pool;
