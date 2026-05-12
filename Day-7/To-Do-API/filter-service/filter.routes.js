const express = require('express');
const router  = express.Router();
const { filterTasks } = require('./filter.controller');

router.get('/', filterTasks);

module.exports = router;