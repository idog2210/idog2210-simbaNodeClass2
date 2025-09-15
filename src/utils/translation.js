const request = require('request');

const translation = (expression, callback) => {
  const url =
    'https://api.funtranslations.com/translate/sith.json?text=' +
    encodeURIComponent(expression);
  request({ url, json: true }, (error, response) => {
    if (error) {
      return callback('Network error');
    } else if (response?.body?.error) {
      return callback(response.body.error.message);
    }
    const transWord = response?.body?.contents?.translated;

    callback(null, { transWord });
  });
};

module.exports = translation;
