const wpm = document.getElementById('wpm');
const accuracy = document.getElementById('accuracy');
const timer = document.getElementById('timer');
let textToType = document.getElementById('textToType');
const textInput = document.getElementById('textInput');
const header = document.getElementById('header');

const RANDOM_TEXT_API = 'https://api.quotable.io/random';

let gameOver = false;
let storedTexts = [];
let interval;

function fetchRandomText() {
    return fetch(RANDOM_TEXT_API)
        .then(response => response.json())
        .then(data => {
            storedTexts.push(data.content);
        });
}

async function fetchTexts() {
    for (let i = 0; i < 8; i++) {
        await fetchRandomText();
    }
}

async function renderTextToType(){
    if (storedTexts.length < 8) {
        await fetchTexts();
    }
    const texts = storedTexts.splice(0, 8);
    textToType.innerText = texts.join(' ');
}

async function game(){
    gameOver = false;
    textToType.innerText = "Loading...";
    let time = 60;
    let words = textToType.innerText.split(' ');
    let i = 0;
    textInput.onfocus = () => {
        const interval = setInterval(() => {
            if (time === 0) {
                clearInterval(interval);
                textInput.disabled = true;
                console.log('Game Over');
                textInput.disabled = true;
                wpm.innerText = Math.floor(correctWords.innerText.split(' ').length);
                header.style.display = 'flex';
            } else {
                time -= 1;

            }
            timer.innerText = time;
        }, 1000);
    }
    await renderTextToType();
    textInput.addEventListener('input', () => {
        let inputWord = textInput.value;
        let wordToType = words[i] + ' ';
        console.log(inputWord, wordToType)
        if (inputWord === wordToType) {
            textToType.innerText = textToType.innerText.slice(wordToType.length);
            textInput.value = '';
            i++;
        }
        if (textToType.innerText === '') {
            textInput.disabled = true;
        }
    });
}

game();