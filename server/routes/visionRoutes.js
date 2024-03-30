// visionRoutes.js

const express = require('express');
const router = express.Router();
const visionController = require('../controllers/visionController');

router.get('/maxVisionId', visionController.getMaxVisionId);

module.exports = router;
