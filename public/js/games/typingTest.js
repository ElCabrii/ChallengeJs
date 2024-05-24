const wpm = document.getElementById('wpm');
const accuracy = document.getElementById('accuracy');
const timer = document.getElementById('timer');
let textToType = document.getElementById('textToType');
const textInput = document.getElementById('textInput');
const gameEnd = document.getElementById('gameEnd');
const finalWpm = document.getElementById('finalWpm');

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

gameEnded = () => {
    textInput.disabled = true;
    timer.style.display = 'none';
    container.style.display = 'none';
    gameEnd.style.display = 'flex';
    finalWpm.innerText = wpm.innerText;
    textInput.value = '';
}

async function game(){
    gameEnd.style.display = 'none';
    container.style.display = 'flex';
    timer.style.display = 'flex';
    textToType.innerText = "Loading...";
    let time = 60;
    let i = 0;
    textInput.onfocus = () => {
        const interval = setInterval(() => {
            if (time === 0) {
                clearInterval(interval);
                gameEnded();
            } else {
                time -= 1;

            }
            timer.innerText = time;
        }, 1000);
    }
    await renderTextToType();
    let words = textToType.innerText.split(' ');
    textInput.addEventListener('input', () => {
        let inputWord = textInput.value;
        let wordToType = words[i] + ' ';
        console.log(inputWord, wordToType)
        if (inputWord === wordToType) {
            textToType.innerText = textToType.innerText.slice(wordToType.length);
            textInput.value = '';
            wpm.innerText ++;
            i++;
        }
        if (textToType.innerText === '') {
            textInput.disabled = true;
        }
        if (i === words.length) {
            clearInterval(interval)
            gameEnded();
        }
    });
}

window.onload = restartButton.onclick = game;