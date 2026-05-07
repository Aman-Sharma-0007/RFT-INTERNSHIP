const axios = require('axios');

const getRandomJoke = async () => {
  const response = await axios.get(process.env.JOKE_API);
  const { setup, punchline, type } = response.data;

  return {
    setup,
    punchline,
    category: type,
  };
};

module.exports = { getRandomJoke };