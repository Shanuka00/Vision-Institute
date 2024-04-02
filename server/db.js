const mysql = require('mysql');

// Database connection configuration
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'visionedu'
});

// Get a connection from the pool to check if the database is connected
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
    connection.release();
});

module.exports = pool;
