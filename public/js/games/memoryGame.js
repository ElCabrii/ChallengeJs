const errors = document.getElementById('errors');
const game = document.getElementById('game');
const resetButton = document.getElementById('resetButton');

let cardList = [
    'Enzo',
    'Seb',
    'Ludo',
    'Yanis',
    'Lucas',
    'Joey',
];

let cardSet;
let board = [];
let rows = 4, columns = 6;
let card1, card2;


window.onload = () => {
    shuffleCards();
    startGame();
}

resetButton.onclick = () => {
    cardSet = [];
    board = [];
    card1 = null;
    card2 = null;
    game.innerHTML = "";
    errors.innerText = 0;
    shuffleCards();
    startGame();
}

function shuffleCards() {
    cardSet = cardList.concat(cardList).concat(cardList).concat(cardList);
    cardSet.sort(() => Math.random() - 0.5);
}

function startGame() {
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            let cardImg = cardSet.pop();
            row.push(cardImg);
            let card = document.createElement("img");
            card.style.display = "none";
            card.id = r.toString() + "-" + c.toString();
            card.src = "/img/memoryGame/" + cardImg + ".png";
            card.classList.add("card");
            card.addEventListener("click", selectCard);
            game.append(card);
        }
        board.push(row);
    }
    setTimeout(hideCards, 1000);
}

function hideCards() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let card = document.getElementById(r.toString() + "-" + c.toString());
            card.src = "/img/memoryGame/back.png";
            card.style.display = "block";
        }
    }
}

function selectCard() {
    if (this.src.includes("back")) {
        if (!card1) {
            card1 = this;
            let coords = card1.id.split("-"); //"0-1" -> ["0", "1"]
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);
            card1.src = "/img/memoryGame/" + board[r][c] + ".png";
        }
        else if (!card2 && this !== card1) {
            card2 = this;

            let coords = card2.id.split("-"); //"0-1" -> ["0", "1"]
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);
            card2.src = "/img/memoryGame/" + board[r][c] + ".png";
            setTimeout(update, 1000);
        }
    }
}

function update() {
    if (card1.src !== card2.src) {
        card1.src = "/img/memoryGame/back.png";
        card2.src = "/img/memoryGame/back.png";
        errors.innerText++;
    }
    card1 = null;
    card2 = null;
}
