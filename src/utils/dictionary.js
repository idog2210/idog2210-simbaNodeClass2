const axios = require('axios');

const dictionary = async (word, callback) => {
  const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + word;

  try {
    const response = await axios.get(url);
    const data = response.data;

    const definition = data?.[0]?.meanings?.[0]?.definitions?.[0]?.definition || 'No definition found';
    const synonymsStr = data?.[0]?.meanings?.[0]?.synonyms?.join(', ') || 'No synonyms found';
    const pronunciation = data?.[0]?.phonetics?.find((p) => p?.text)?.text || 'No pronunciation found';

    callback(null, { definition, synonyms: synonymsStr, pronunciation });
  } catch (error) {
    if (error.response) {
      return callback("The word you searched for isn't available on the dictionary. Try another word.");
    } else if (error.request) {
      return callback("No internet connection. Can't complete search.");
    }
  }
};

module.exports = dictionary;
