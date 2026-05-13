const express = require('express');
const router = express.Router();
const { register, login } = require('./authController');
const { registerRules, loginRules, validate } = require('./validate');

router.post('/register', registerRules, validate, register);
router.post('/login', loginRules, validate, login);

module.exports = router;