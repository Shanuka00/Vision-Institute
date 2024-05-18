const ProfileModel = require('../models/stprofileModel');
const QRCode = require('qrcode');

const getProfileByVisionId = (req, res) => {
    const visionId = req.body.visionId;

    ProfileModel.findByVisionId(visionId, (err, profileData) => {
        if (err) {
            return res.status(500).json({ message: 'Server error', error: err });
        }
        if (!profileData) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.status(200).json(profileData);
    });
};


module.exports = {
    getProfileByVisionId
};
