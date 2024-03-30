const visionModel = require('../models/visionModel');

const getMaxVisionId = async (req, res) => {
    try {
        const result = await visionModel.getMaxVisionId();
        res.json({ visionId: result });
    } catch (err) {
        console.error('Error fetching vision IDs:', err);
        res.status(500).json({ error: 'Internal server error', message: err.message });
    }
};

module.exports = {
    getMaxVisionId
};
