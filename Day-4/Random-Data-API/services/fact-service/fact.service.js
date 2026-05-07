const axios = require('axios');

const getRandomFact = async () => {
  const response = await axios.get(process.env.FACT_API);
  const { text, source } = response.data;

  return {
    fact: text,
    source: source,
  };
};

module.exports = { getRandomFact };