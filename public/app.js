const dictForm = document.querySelector('#dictForm');
const dictFormInput = document.querySelector('#dictFormInput');
const wordDictP = document.getElementById('wordDictP');
const message1 = document.getElementById('message1');
const message2 = document.getElementById('message2');
const message3 = document.getElementById('message3');
const transForm = document.getElementById('transForm');

const translateDiv = document.getElementById('translateDiv');
const message4 = document.getElementById('message4');

const dictFormEventFunction = (event) => {
  event.preventDefault();

  const word = dictFormInput.value;
  dictFormInput.value = '';

  wordDictP.textContent = '';
  message1.textContent = 'Loading...';
  message2.textContent = '';
  message3.textContent = '';
  translateDiv.style.display = 'none';
  message4.textContent = '';

  fetch('http://localhost:3001/dictionary?word=' + encodeURI(word)).then((response) => {
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
};

const transFormEventFunction = (event) => {
  event.preventDefault();

  translateDiv.style.display = 'block';
  let expression = message1.textContent;
  message4.textContent = 'loading...';

  fetch('http://localhost:3001/translation?expression=' + encodeURIComponent(expression)).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        return (message4.textContent = 'Error: ' + data.error);
      }

      message4.textContent = data.translation;
    });
  });
};

const randomWordEventFunction = () => {
  fetch('http://localhost:3001/random').then((response) => {
    response.json().then((data) => {
      lastRandomWord = data.word;
      dictFormInput.value = lastRandomWord;
    });
  });
};

dictForm.addEventListener('submit', dictFormEventFunction);
transForm.addEventListener('click', transFormEventFunction);

const randomWordButton = document.getElementById('randomWordButton');

let lastRandomWord = null;

randomWordButton.addEventListener('click', randomWordEventFunction);
