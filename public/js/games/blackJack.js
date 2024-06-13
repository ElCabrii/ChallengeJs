let cards = [
    { name: '2', value: 2 },
    { name: '3', value: 3 },
    { name: '4', value: 4 },
    { name: '5', value: 5 },
    { name: '6', value: 6 },
    { name: '7', value: 7 },
    { name: '8', value: 8 },
    { name: '9', value: 9 },
    { name: '10', value: 10 },
    { name: 'J', value: 10 },
    { name: 'Q', value: 10 },
    { name: 'K', value: 10 },
    { name: 'A', value: 11, altValue: 1 }
];

let deck = [];
let playerHand = [];
let dealerHand = [];
let playerScore = 0;
let dealerScore = 0;
let playerTurn = true;
let gameOver = false;
let playerMoney = 1000; // Initial amount of money the player has

function createCardElement(card, parentElementId) {
    let cardContainer = document.createElement('div');
    cardContainer.classList.add('card-container');

    let cardImage = document.createElement('img');
    cardImage.classList.add('card');
    cardImage.src = `/img/blackJack/${card.name}.png`; // Change this to the correct path
    cardImage.alt = card.name;
    cardContainer.appendChild(cardImage);

    let cardValue = document.createElement('span');
    cardValue.classList.add('card-value');
    cardValue.textContent = card.name === 'A' ? 'A' : card.value; // Use card.name instead of card.value for Aces
    cardContainer.appendChild(cardValue);

    let parentElement = document.getElementById(parentElementId);
    parentElement.appendChild(cardContainer);
}



function createDeck() {
    deck = [];
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < cards.length; j++) {
            deck.push({ ...cards[j] });
        }
    }
}

function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let randomIndex = Math.floor(Math.random() * deck.length);
        let temp = deck[i];
        deck[i] = deck[randomIndex];
        deck[randomIndex] = temp;
    }
}

function dealCard() {
    return deck.pop();
}

function calculateScore(hand) {
    let score = 0;
    let aces = 0;
    for (let i = 0; i < hand.length; i++) {
        if (hand[i].name === 'A') {
            aces++;
        } else {
            score += hand[i].value;
        }
    }
    for (let i = 0; i < aces; i++) {
        if (score + 11 <= 21) {
            score += 11;
        } else {
            score += 1;
        }
    }
    return score;
}

function checkBlackJack(score) {
    return score === 21;
}

function checkBust(score) {
    return score > 21;
}

function checkWin(playerScore, dealerScore, playerHand, dealerHand) {
    let playerBlackjack = checkBlackJack(playerScore) && playerHand.length === 2;
    let dealerBlackjack = checkBlackJack(dealerScore) && dealerHand.length === 2;

    if (playerBlackjack && dealerBlackjack) {
        return 'No one';
    } else if (playerBlackjack) {
        return 'Player';
    } else if (dealerBlackjack) {
        return 'Dealer';
    } else if (playerScore > dealerScore) {
        return 'Player';
    } else if (playerScore < dealerScore) {
        return 'Dealer';
    } else {
        return 'No one';
    }
}

function hit() {
    if (playerTurn && !gameOver) {
        let card = dealCard();
        playerHand.push(card);
        playerScore = calculateScore(playerHand);
        createCardElement(card, 'playerCards');
        if (checkBust(playerScore)) {
            gameOver = true;
            endGame('Dealer')
        }
        // Update the displayed score
        document.getElementById('playerScore1').innerText = `Player Score: ${playerScore}`;
    }
}

function stand() {
    if (playerTurn && !gameOver) {
        playerTurn = false;
        while (dealerScore <= 17) {
            let card = dealCard();
            dealerHand.push(card);
            dealerScore = calculateScore(dealerHand);
            createCardElement(card, 'dealerCards');
        }
        gameOver = true;
        // Display the result
        document.getElementById('playerScore1').innerText = `Player Score: ${playerScore}`;
        document.getElementById('dealerScore1').innerText = `Dealer Score: ${dealerScore}`;
        if (checkBust(dealerScore)) {
            endGame('Player')
        } else {
            let result = checkWin(playerScore, dealerScore, playerHand, dealerHand);
            endGame(result)
        }
    }
}

function resetGame() {
    deck = [];
    playerHand = [];
    dealerHand = [];
    playerScore = 0;
    dealerScore = 0;
    playerTurn = true;
    gameOver = false;
    document.getElementById('playerCards').innerHTML = '';
    document.getElementById('dealerCards').innerHTML = '';
    document.getElementById('playerScore1').innerText = '';
    document.getElementById('dealerScore1').innerText = '';
}

function startGame() {
    resetGame();
    createDeck();
    shuffleDeck();
    playerHand.push(dealCard());
    dealerHand.push(dealCard());
    playerHand.push(dealCard());
    dealerHand.push(dealCard());

    // Update UI with new cards
    createCardElement(playerHand[0], 'playerCards');
    createCardElement(dealerHand[0], 'dealerCards');
    createCardElement(playerHand[1], 'playerCards');
    createCardElement(dealerHand[1], 'dealerCards');

    playerScore = calculateScore(playerHand);
    dealerScore = calculateScore(dealerHand);
    if (checkBlackJack(playerScore) || checkBlackJack(dealerScore)) {
        gameOver = true;
        let result = checkWin(playerScore, dealerScore, playerHand, dealerHand);
        endGame(result);
    }

    // Display the initial scores
    document.getElementById('playerScore1').innerText = `Player Score: ${playerScore}`;
    document.getElementById('dealerScore1').innerText = `Dealer Score: ${dealerScore}`;
}


function endGame(winner){
    document.getElementById("table").style.display = 'none';
    document.getElementById('winner').innerText = winner;
    if (winner === 'No one'){
        document.getElementById('results').innerText+='It\'s a tie!';
    }
    document.getElementById('playerScore2').innerText = playerScore;
    document.getElementById('dealerScore2').innerText = dealerScore;
    document.getElementById('gameOver').style.display = 'flex';
}

window.onload = () => {
    startGame();
}