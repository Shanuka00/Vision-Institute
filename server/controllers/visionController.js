const visionModel = require('../models/visionModel');
//const encryptPassword = require('../middleware/encryptPasswordMiddleware');
const encryptPassword = require('../middleware/encryptPassword');

// Function to add a new user to the visionuser table
const addUser = async (req, res) => {
    try {
        const { maxVisionId, firstName, lastName, initial, birthday, password, gender, emailAddress, mobilePhone, whatsappNumber, addressLine1, addressLine2, city, school, parentName, occupation, contactNo, aboutVision, role, state } = req.body;
                
        // Call the model function to insert data into the visionuser table
        await visionModel.addUser({ maxVisionId, firstName, lastName, initial, birthday, password, gender, emailAddress, mobilePhone, whatsappNumber, addressLine1, addressLine2, city, school, parentName, occupation, contactNo, aboutVision, role, state });
        
        res.status(201).json({ message: 'User inserted successfully.' });
    } catch (err) {
        console.error('Error inserting user:', err);
        res.status(500).json({ error: 'Internal server error', message: err.message });
    }
  };


const getMaxVisionId = async (req, res) => {
    try {
        const result = await visionModel.getMaxVisionId();
        const prefix = result.match(/[A-Za-z]+/)[0]; // Extract the prefix dynamically
        const currentId = result.slice(prefix.length); // Extract numeric part after the prefix
        const nextId = parseInt(currentId) + 1; // Increment the numeric part
        const nextVisionId = `${prefix}${nextId}`; // Concatenate the prefix with the incremented numeric part
        res.json({ visionId: nextVisionId });
    } catch (err) {
        console.error('Error fetching vision IDs:', err);
        res.status(500).json({ error: 'Internal server error', message: err.message });
    }
};


// Route handler for updating password and state
const updatePasswordAndState = async (req, res) => {
    const { visionId, password } = req.body;

    try {
        // Check if the visionId exists in the database
        const user = await visionModel.getUserByVisionId(visionId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if the password matches the confirmation
        const confirmPassword = req.body.confirmPassword;
        if (password !== confirmPassword) {
            return res.status(400).json({ error: 'Passwords do not match' });
        }

        const encryptedPassword = encryptPassword(password);

        // Update the user's password and state
        await visionModel.updatePasswordAndState(visionId, encryptedPassword);

        // Send a success response
        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error updating password and state:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports = {
    addUser,
    getMaxVisionId,
    updatePasswordAndState
};
