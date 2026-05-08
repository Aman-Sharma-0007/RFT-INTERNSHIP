const express = require('express');
const router = express.Router();
const quoteService = require('./quote.service');

router.get('/', async (req, res) => {
  const result = await quoteService.getRandomQuote();

  if (result.error) {
    return res.status(result.status).json({
      status: 'error',
      message: result.message,
      fallback: result.fallback
    });
  }

  res.json({ status: 'success', ...result });
});

module.exports = router;