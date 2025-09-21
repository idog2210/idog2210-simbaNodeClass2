const axios = require('axios');

const random = async (callback) => {
  const url = 'https://random-word-api.vercel.app/api?words=1';

  try {
    const response = await axios.get(url);

    const randomWord = response?.data?.[0];
    callback(null, { randomWord });
  } catch (error) {
    return callback('Network error');
  }
};

module.exports = random;
