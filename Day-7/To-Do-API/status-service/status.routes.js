const express = require('express');
const router  = express.Router();
const { updateStatus } = require('./status.controller');

router.patch('/:id', updateStatus);

module.exports = router;