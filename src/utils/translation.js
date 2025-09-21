const axios = require('axios');

const translation = async (expression, callback) => {
  const url = 'https://api.funtranslations.com/translate/sith.json?text=' + encodeURIComponent(expression);
  try {
    const response = await axios.get(url);

    if (response?.data?.error) {
      return callback(response.data.error.message);
    }

    const transWord = response?.data?.contents?.translated;
    callback(null, { transWord });
  } catch (error) {
    callback('Network error');
  }
};

module.exports = translation;
