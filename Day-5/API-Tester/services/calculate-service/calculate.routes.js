const express = require('express');
const router = express.Router();
const calculateService = require('./calculate.service');

router.get('/', (req, res) => {
  const { num1, num2, operation } = req.query;

  if (!num1 || !num2 || !operation) {
    return res.status(400).json({
      status: 'error',
      message: 'Missing params. Required: num1, num2, operation (add | sub | mul | div)'
    });
  }

  const result = calculateService.calculate(num1, num2, operation);

  if (result.error) {
    return res.status(result.status).json({ status: 'error', message: result.message });
  }

  res.json({ status: 'success', ...result });
});

module.exports = router;