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
    { name: 'A', value: 1, altValue: 11 }
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
    let cardElement = document.createElement('div');
    cardElement.classList.add('card');
    let cardText = document.createTextNode(card.name + ' ' + card.value);
    cardElement.appendChild(cardText);
    let parentElement = document.getElementById(parentElementId);
    parentElement.appendChild(cardElement);
}

function createDeck() {
    deck = [];
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < cards.length; j++) {
            deck.push(cards[j]);
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
        score += hand[i].value;
        if (hand[i].name === 'A') {
            aces++;
        }
    }
    while (score > 21 && aces > 0) {
        score -= 10;
        aces--;
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
        return 'Both Player and Dealer have Blackjack! It\'s a Tie!';
    } else if (playerBlackjack) {
        return 'Player has Blackjack! You Win!';
    } else if (dealerBlackjack) {
        return 'Dealer has Blackjack! You Lose!';
    } else if (playerScore > dealerScore) {
        return 'You Win!';
    } else if (playerScore < dealerScore) {
        return 'You Lose!';
    } else {
        return 'It\'s a Tie!';
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
            alert('Player Busts! You Lose!');
        }
        // Update the displayed score
        document.querySelector('.playerScore').textContent = `Player Score: ${playerScore}`;
    }
}

function stand() {
    if (playerTurn && !gameOver) {
        playerTurn = false;
        while (dealerScore < 17) {
            let card = dealCard();
            dealerHand.push(card);
            dealerScore = calculateScore(dealerHand);
            createCardElement(card, 'dealerCards');
        }
        gameOver = true;
        // Display the result
        document.querySelector('.playerScore').textContent = `Player Score: ${playerScore}`;
        document.querySelector('.dealerScore').textContent = `Dealer Score: ${dealerScore}`;
        if (checkBust(dealerScore)) {
            alert('Dealer Busts! You Win!');
        } else {
            let result = checkWin(playerScore, dealerScore, playerHand, dealerHand);
            alert(result);
        }
        // Update the displayed player money
        document.querySelector('.playerMoney').textContent = `Player Money: ${playerMoney}`;
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
    document.querySelector('.playerScore').textContent = '';
    document.querySelector('.dealerScore').textContent = '';
}

function getGameInfo() {
    return {
        playerHand: playerHand,
        dealerHand: dealerHand,
        playerScore: playerScore,
        dealerScore: dealerScore,
        playerTurn: playerTurn,
        gameOver: gameOver
    };
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
    }

    // Display the initial scores
    document.querySelector('.playerScore').textContent = `Player Score: ${playerScore}`;
    document.querySelector('.dealerScore').textContent = `Dealer Score: ${dealerScore}`;
}

module.exports = {
    hit,
    stand,
    getGameInfo,
    startGame,
    playerMoney
};
