const express = require('express');
const cors = require('cors');
const visionController = require('./controllers/visionController');

const app = express();
const port = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Route to fetch the maximum vision ID
app.get('/api/vision/maxVisionId', visionController.getMaxVisionId);

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
