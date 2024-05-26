const pool = require('../db');

// Controller function to fetch new registrations
exports.getRegistrations = async (req, res) => {
    try {
        const query = 'SELECT * FROM visionuser WHERE state = "YesRegYesPass"';
        pool.query(query, (error, results) => {
            if (error) {
                console.error('Error fetching registrations:', error);
                return res.status(500).json({ message: 'Error fetching registrations' });
            }
            res.json({ registrations: results });
        });
    } catch (error) {
        console.error('Error fetching registrations:', error);
        res.status(500).json({ message: 'Error fetching registrations' });
    }
};

// Controller function to approve a registration
exports.approveRegistration = async (req, res) => {
    const { visionId } = req.body;
    try {
        const query = 'UPDATE visionuser SET state = "approved" WHERE visionid = ?';
        pool.query(query, [visionId], (error, results) => {
            if (error) {
                console.error('Error approving registration:', error);
                return res.status(500).json({ message: 'Error approving registration' });
            }
            res.json({ message: 'Registration approved' });
        });
    } catch (error) {
        console.error('Error approving registration:', error);
        res.status(500).json({ message: 'Error approving registration' });
    }
};

// Controller function to reject a registration
exports.rejectRegistration = async (req, res) => {
    const { visionId } = req.body;
    try {
        const query = 'UPDATE visionuser SET state = "rejected" WHERE visionid = ?';
        pool.query(query, [visionId], (error, results) => {
            if (error) {
                console.error('Error rejecting registration:', error);
                return res.status(500).json({ message: 'Error rejecting registration' });
            }
            res.json({ message: 'Registration rejected' });
        });
    } catch (error) {
        console.error('Error rejecting registration:', error);
        res.status(500).json({ message: 'Error rejecting registration' });
    }
};
