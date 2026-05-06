const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// GET /users → return all users
router.get('/', userController.getAllUsers);

// GET /users/:id → return specific user
router.get('/:id', userController.getUserById);

module.exports = router;