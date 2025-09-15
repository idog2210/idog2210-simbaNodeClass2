const path = require('path');
const express = require('express');
const dictionary = require('./utils/dictionary');
const translation = require('./utils/translation');
const random = require('./utils/random');

const app = express();

const publicDirectoryPath = path.join(__dirname, '../public');
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.sendFile(path.join(publicDirectoryPath, 'index.html'));
});

app.get('/dictionary', (req, res) => {
  if (!req.query.word) {
    return res.send({
      error: 'You must provide a word',
    });
  }

  const word = req.query.word;
  dictionary(word, (error, response) => {
    if (error) {
      return res.send({ error });
    }

    res.send({
      definition: response.definition,
      synonyms: response.synonyms,
      pronunciation: response.pronunciation,
    });
  });
});

app.get('/translation', (req, res) => {
  if (!req.query.expression) {
    return res.send({
      error: 'You must provide an expression',
    });
  }

  const expression = req.query.expression;
  translation(expression, (error, response) => {
    if (error) {
      return res.send(error);
    }

    res.send({
      translation: response.transWord,
    });
  });
});

app.get('/random', (req, res) => {
  random((error, response) => {
    if (error) {
      return res.send(error);
    }

    res.send({
      word: response.randomWord,
    });
  });
});

app.listen(3001, () => {
  console.log('Server is up on port 3001.');
});
