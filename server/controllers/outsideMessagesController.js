const pool = require('../db');
const OutsideMessage = require('../models/outsideMessagesModel');

// Controller function to fetch new messages from outside
exports.getOutsideMessages = async (req, res) => {
    try {
        const query = 'SELECT * FROM outmsg WHERE seen = 0';
        pool.query(query, (error, results) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ message: "Server error" });
            }
            res.json(results);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }

};

// Controller function to mark a message as seen
exports.markMessageAsSeen = async (req, res) => {
    try {
        const { messageId } = req.body;
        const query = 'UPDATE outmsg SET seen = 1 WHERE msgid = ?';
        pool.query(query, [messageId], (error, results) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ message: "Server error" });
            }
            res.json({ message: "Message marked as seen successfully" });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Controller function to handle contact form submission
exports.sendMessage = async (req, res) => {
    try {
        const { name, email, mobile, message } = req.body;
        await OutsideMessage.saveMessage(name, email, mobile, message);
        res.status(200).json({ message: 'Message sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};