// UserController.js

// Function to add a new user
const addUser = (req, res) => {
    const { name, email, age, gender } = req.body;

    // Access the database connection from server.js
    const db = req.app.get('db');

    // Insert the user data into the database
    const sql = "INSERT INTO users (name, email, age, gender) VALUES (?, ?, ?, ?)";
    db.query(sql, [name, email, age, gender], (err, result) => {
        if (err) {
            console.error('Error adding user:', err);
            return res.status(500).json({ message: 'Failed to add user', error: err });
        }
        console.log('User added successfully');
        return res.json({ message: 'User added successfully' });
    });
};

module.exports = {
    addUser
};
