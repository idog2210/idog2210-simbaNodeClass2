const request = require('request');

const dictionary = (word, callback) => {
  const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + word;

  request({ url, json: true }, (error, response) => {
    if (error) {
      return callback("No internet connection, can't complete search.");
    } else if (response.body.title === 'No Definitions Found') {
      return callback(
        "The word you searched for isn't avilable on the dictionary. Try searching another word."
      );
    }

    const b = response.body?.[0];
    const definition =
      b?.meanings?.[0]?.definitions?.[0]?.definition || 'No definition found';
    const synonymsStr =
      b?.meanings?.[0]?.synonyms?.join(', ') || 'No synonyms found';
    const pronunciation =
      b?.phonetics?.find((p) => p?.text)?.text || 'No pronunciation found';

    callback(null, { definition, synonyms: synonymsStr, pronunciation });
  });
};

module.exports = dictionary;
