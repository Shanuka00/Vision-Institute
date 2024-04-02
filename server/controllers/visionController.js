const visionModel = require('../models/visionModel');
const visionRoutes = require('../routes/visionRoutes');

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

module.exports = {
    addUser,
    getMaxVisionId
};
