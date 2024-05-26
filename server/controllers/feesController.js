const pool = require('../db');

// Controller function to fetch current registration fees value
exports.getCurrentFees = async (req, res) => {
    try {
        const query = 'SELECT value FROM justinfo WHERE infoid = 1';
        pool.query(query, (error, results) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ message: "Server error" });
            }
            res.json(results[0]);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Controller function to update registration fees value
exports.updateFees = async (req, res) => {
    try {
        const { newFees } = req.body;
        const query = 'UPDATE justinfo SET value = ? WHERE infoid = 1';
        pool.query(query, [newFees], (error, results) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ message: "Server error" });
            }
            res.json({ message: "Fees updated successfully" });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
