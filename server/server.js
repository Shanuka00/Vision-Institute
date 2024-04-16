const express = require('express');
const session = require('express-session');
const cors = require('cors');
const visionRoutes = require('./routes/visionRoutes');

const app = express();
const port = 5000;

app.use(session({
    secret: process.env.SESSION_SECRET || 'default_session_secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: 'auto', maxAge: 3600000 } // 1 hour
}));

// Middleware
app.use(express.json());
app.use(cors());

// Use vision routes
app.use('/api/vision', visionRoutes);

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
