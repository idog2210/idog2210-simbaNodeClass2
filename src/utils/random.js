const request = require('request');

const random = (callback) => {
  const url = 'https://random-word-api.vercel.app/api?words=1';

  request({ url, json: true }, (error, response) => {
    if (error) {
      return callback('Network error');
    }

    const randomWord = response?.body?.[0];
    callback(null, { randomWord });
  });
};

module.exports = random;
