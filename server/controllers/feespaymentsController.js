const pool = require('../db');

// Controller function to fetch new feespayments
exports.getFeesPayments = async (req, res) => {
    try {
        const query = 'SELECT * FROM classfees WHERE state != "approved" AND state != "rejected"';
        pool.query(query, (error, results) => {
            if (error) {
                console.error('Error fetching feespayments:', error);
                return res.status(500).json({ message: 'Error fetching feespayments' });
            }
            res.json({ feespayments: results });
        });
    } catch (error) {
        console.error('Error fetching feespayments:', error);
        res.status(500).json({ message: 'Error fetching feespayments' });
    }
};

// Controller function to approve a feespayment
exports.approveFeesPayment = async (req, res) => {
    const { classfeeId } = req.body;
    try {
        const query = 'UPDATE classfees SET state = "approved" WHERE classfeeid = ?';
        pool.query(query, [classfeeId], (error, results) => {
            if (error) {
                console.error('Error approving feespayment:', error);
                return res.status(500).json({ message: 'Error approving feespayment' });
            }
            res.json({ message: 'FeesPayment approved' });
        });
    } catch (error) {
        console.error('Error approving feespayment:', error);
        res.status(500).json({ message: 'Error approving feespayment' });
    }
};

// Controller function to reject a feespayment
exports.rejectFeesPayment = async (req, res) => {
    const { classfeeId } = req.body;
    try {
        const query = 'UPDATE classfees SET state = "rejected" WHERE classfeeid = ?';
        pool.query(query, [classfeeId], (error, results) => {
            if (error) {
                console.error('Error rejecting feespayment:', error);
                return res.status(500).json({ message: 'Error rejecting feespayment' });
            }
            res.json({ message: 'FeesPayment rejected' });
        });
    } catch (error) {
        console.error('Error rejecting feespayment:', error);
        res.status(500).json({ message: 'Error rejecting feespayment' });
    }
};
