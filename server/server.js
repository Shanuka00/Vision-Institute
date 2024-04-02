const express = require('express');
const cors = require('cors');
const visionRoutes = require('./routes/visionRoutes');

const app = express();
const port = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Use vision routes
app.use('/api/vision', visionRoutes);

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
