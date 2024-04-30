const wpm = document.getElementById('wpm');
const accuracy = document.getElementById('accuracy');
const timer = document.getElementById('timer');
const textToType = document.getElementById('textToType');
const textInput = document.getElementById('textInput');
const header = document.getElementById('header');

const RANDOM_TEXT_API = 'https://api.quotable.io/random';

let gameOver = false;
let storedTexts = [];

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
    header.style.display = 'none';
    textToType.innerText = "Loading...";
    await renderTextToType();
    let typedText = '';
    let time = 60;
    let words = textToType.innerText.split(' ');
    let correctWords = 0;
    textInput.onfocus = () => {
        const interval = setInterval(() => {
            time -= 1;
            timer.innerText = time;
            if (time === 0) {
                clearInterval(interval);
                textInput.disabled = true;
                let time = 60;
                console.log('Game Over');
                textInput.disabled = true;
                wpm.innerText = Math.floor(correctWords / textToType.innerText.split(' ').length * 60);
                header.style.display = 'flex';
                }
        }, 1000);
    }
    textInput.addEventListener('input', () => {
        let inputWord = textInput.value;
        let wordToType = words[correctWords] + ' ';
        console.log(inputWord, wordToType)
        if (inputWord === wordToType) {
            typedText += wordToType;
            correctWords++;
            textInput.value = '';
        }
        if (typedText.value === textToType.innerText) {
            textInput.disabled = true;
            header.style.display = 'flex';
        }
    });
}

game();