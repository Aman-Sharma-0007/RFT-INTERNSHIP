const express  = require('express');
const router   = express.Router();
const { checkId } = require('./idguard.controller');

router.post('/check-id', checkId);

module.exports = router;