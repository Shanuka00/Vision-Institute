const updateProfilesModel = require('../models/updateProfilesModel');

// Controller function to update student profile
const updateStProfile = async (req, res) => {
    try {
        // Extract student profile data from request body
        const studentProfile = req.body;

        // Call model function to update student profile
        const updatedProfile = await updateProfilesModel.updateStudentProfile(studentProfile);

        // Send response
        res.status(200).json({ message: 'Student profile updated successfully', profile: updatedProfile });
    } catch (error) {
        console.error('Error updating student profile:', error);
        res.status(500).json({ error: 'Internal server error', message: error.message });
    }
};

module.exports = {
    updateStProfile
};
