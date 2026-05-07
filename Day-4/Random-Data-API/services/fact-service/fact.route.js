const express = require('express');
const router = express.Router();
const { getRandomFact } = require('./fact.service');

router.get('/', async (req, res) => {
  try {
    const data = await getRandomFact();
    res.json({
      success: true,
      type: 'fact',
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch fact',
      error: error.message,
    });
  }
});

module.exports = router;