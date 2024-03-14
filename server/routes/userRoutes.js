// userRoutes.js

const express = require('express');
const router = express.Router();
const { addUser } = require('../controllers/UserController');

// Route to add a new user
router.post('/add', addUser);

module.exports = router;
