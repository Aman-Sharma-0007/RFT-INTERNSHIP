const axios = require('axios');
require('dotenv').config({ path: '../../.env' });
const quoteService = {
  getRandomQuote: async () => {
    try {
      const response = await axios.get(process.env.QUOTE_API_URL || 'https://zenquotes.io/api/random');
      const data = response.data[0];
      return {
        error: false,
        quote: data.q,
        author: data.a,
        source: 'zenquotes.io'
      };
    } catch (err) {
      console.error('❌ Quote API error:', err.message);
      return {
        error: true,
        status: 502,
        message: 'Failed to fetch from ZenQuotes API',
        fallback: {
          quote: 'First, solve the problem. Then, write the code.',
          author: 'John Johnson'
        }
      };
    }
  }
};

module.exports = quoteService;