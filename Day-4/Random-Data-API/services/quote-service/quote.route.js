const express = require('express');
const router = express.Router();
const { getRandomQuote } = require('./quote.service');

router.get('/', async (req, res) => {
  try {
    const data = await getRandomQuote();
    res.json({
      success: true,
      type: 'quote',
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch quote',
      error: error.message,
    });
  }
});

module.exports = router;