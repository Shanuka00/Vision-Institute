// controllers/userController.js
const User = require('../models/userModel');
const encryptPassword = require('../middleware/encryptPassword');

exports.validateUser = (req, res) => {
    const { visionId, password } = req.body;

    User.findByVisionId(visionId, (error, user) => {
        if (error) {
            return res.status(500).json({ message: 'Database query error', error });
        }
        if (!user) {
            return res.status(401).json({ message: 'Authentication failed. User not found.' });
        }

        // Hash input password using the same method used during password storage
        const hashedPassword = encryptPassword(password);
        if (hashedPassword !== user.password) {
            return res.status(401).json({ message: 'Authentication failed. Wrong password.' });
        }

        // Setup session data
        req.session.user = {
            userId: user.visionid,
            role: user.role
        };

        let redirectPath = determineRedirectPath(user.role, user.state);
        if (!redirectPath) {
            return res.status(401).json({ message: 'Unauthorized access' });
        }

        res.json({
            message: 'Login successful!',
            userId: user.visionid,
            redirect: redirectPath
        });
    });
};

function determineRedirectPath(role, state) {
    switch(role) {
        case 'student':
            return {
                'approved': '/st_dashboard',
                'NoRegYesPass': '/id_create',
                'YesRegYesPass': '/reg_waiting'
            }[state];
        case 'teacher':
            return {
                'registered': '/te_dashboard',
                'removed': '/te_logout'
            }[state];
        case 'admin':
            return {
                'admin': '/ad_dashboard',
            }[state];
        default:
            return null;
    }
}
