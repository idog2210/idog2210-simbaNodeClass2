const dictForm = document.querySelector('#dictForm');
const dictFormInput = document.querySelector('#dictFormInput');

const wordDictP = document.getElementById('wordDictP');
const message1 = document.getElementById('message1');
const message2 = document.getElementById('message2');
const message3 = document.getElementById('message3');

const transForm = document.getElementById('transForm');
const transFormInput = document.getElementById('transFormInput');

const exprTransP = document.getElementById('exprTransP');
const message4 = document.getElementById('message4');

dictForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const word = dictFormInput.value;
  dictFormInput.value = '';

  wordDictP.textContent = '';
  message1.textContent = 'Loading...';
  message2.textContent = '';
  message3.textContent = '';

  fetch('http://localhost:3001/dictionary?word=' + word).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        return (message1.textContent = 'Error: ' + data.error);
      }

      wordDictP.textContent = word.toUpperCase();
      message1.textContent = 'Definition: ' + data.definition;
      message2.textContent = 'Synonyms: ' + data.synonyms;
      message3.textContent = 'Pronunciation: ' + data.pronunciation;
    });
  });
});

transForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const expression = transFormInput.value;
  transFormInput.value = '';

  exprTransP.textContent = '';
  message4.textContent = 'loading...';

  fetch(
    'http://localhost:3001/translation?expression=' +
      encodeURIComponent(expression)
  ).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        return (message4.textContent = 'Error: ' + data.error);
      }

      exprTransP.textContent = 'Your sentence: ' + expression.toUpperCase();
      message4.textContent = 'The translation: ' + data.translation;
    });
  });
});

const randomWordButton = document.getElementById('randomWordButton');
const randomWordP = document.getElementById('randomWordP');

const randomDict = document.getElementById('randomDict');
const randomTrans = document.getElementById('randomTrans');

const randomDictDiv = document.getElementById('randomDictDiv');
const randomWordDictP = document.getElementById('randomWordDictP');
const randomMessage1 = document.getElementById('randomMessage1');
const randomMessage2 = document.getElementById('randomMessage2');
const randomMessage3 = document.getElementById('randomMessage3');

const randomTransDiv = document.getElementById('randomTransDiv');
const randomExprTransP = document.getElementById('randomExprTransP');
const randomMessage4 = document.getElementById('randomMessage4');

let lastRandomWord = null;

randomWordButton.addEventListener('click', () => {
  randomWordP.textContent = 'Loading...';
  randomDictDiv.style.display = 'none';
  randomTransDiv.style.display = 'none';

  fetch('http://localhost:3001/random').then((response) => {
    response.json().then((data) => {
      lastRandomWord = data.word;
      randomWordP.textContent = 'Random word is: ' + lastRandomWord;

      randomDict.addEventListener('click', () => {
        fetch('http://localhost:3001/dictionary?word=' + lastRandomWord).then(
          (response) => {
            response.json().then((data) => {
              if (data.error) {
                return (randomWordDictP.textContent = 'Error: ' + data.error);
              }

              randomTransDiv.style.display = 'none';
              randomDictDiv.style.display = 'block';
              randomWordDictP.textContent = lastRandomWord.toUpperCase();
              randomMessage1.textContent = 'Definition: ' + data.definition;
              randomMessage2.textContent = 'Synonyms: ' + data.synonyms;
              randomMessage3.textContent =
                'Pronunciation: ' + data.pronunciation;
            });
          }
        );
      });

      randomTrans.addEventListener('click', () => {
        fetch(
          'http://localhost:3001/translation?expression=' +
            encodeURIComponent(lastRandomWord)
        ).then((response) => {
          response.json().then((data) => {
            if (data.error) {
              return (randomExprTransP.textContent = 'Error: ' + data.error);
            }

            randomDictDiv.style.display = 'none';
            randomTransDiv.style.display = 'block';
            randomExprTransP.textContent =
              'Your sentence: ' + lastRandomWord.toUpperCase();
            randomMessage4.textContent = 'The translation: ' + data.translation;
          });
        });
      });
    });
  });
});
