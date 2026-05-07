const express = require('express');
const router = express.Router();
const { getRandomJoke } = require('./joke.service');

router.get('/', async (req, res) => {
  try {
    const data = await getRandomJoke();
    res.json({
      success: true,
      type: 'joke',
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch joke',
      error: error.message,
    });
  }
});

module.exports = router;