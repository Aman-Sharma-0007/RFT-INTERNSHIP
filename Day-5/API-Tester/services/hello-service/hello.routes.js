const express = require('express');
const router = express.Router();
const helloService = require('./hello.service');  // ← calls service

router.get('/', (req, res) => {
  const result = helloService.getHello();
  res.json(result);
});

module.exports = router;