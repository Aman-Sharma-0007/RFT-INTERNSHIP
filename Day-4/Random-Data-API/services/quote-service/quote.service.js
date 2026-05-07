const axios = require('axios');

const getRandomQuote = async () => {
  const response = await axios.get(process.env.QUOTE_API);
  const quoteData = response.data[0];

  return {
    quote: quoteData.q,
    author: quoteData.a,
  };
};

module.exports = { getRandomQuote };