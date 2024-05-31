let card = [
    {name: '2', value: 2},
    {name: '3', value: 3},
    {name: '4', value: 4},
    {name: '5', value: 5},
    {name: '6', value: 6},
    {name: '7', value: 7},
    {name: '8', value: 8},
    {name: '9', value: 9},
    {name: '10', value: 10},
    {name: 'J', value: 10},
    {name: 'Q', value: 10},
    {name: 'K', value: 10},
    {name: 'A', value: 11}
];
let deck = [];
let playerHand = [];
let dealerHand = [];
let playerScore = 0;
let dealerScore = 0;
let playerTurn = true;
let gameOver = false;

function createDeck(){
    for(let i = 0; i < 4; i++){
        for(let j = 0; j < card.length; j++){
            deck.push(card[j]);
        }
    }
}

function shuffleDeck(){
    for(let i = 0; i < deck.length; i++){
        let randomIndex = Math.floor(Math.random() * deck.length);
        let temp = deck[i];
        deck[i] = deck[randomIndex];
        deck[randomIndex] = temp;
    }
}

function dealCard(){
    return deck.pop();
}

function calculateScore(hand){
    let score = 0;
    let aces = 0;
    for(let i = 0; i < hand.length; i++){
        score += hand[i].value;
        if(hand[i].name === 'A'){
            aces++;
        }
    }
    while(score > 21 && aces > 0){
        score -= 10;
        aces--;
    }
    return score;
}

function checkBlackJack(score){
    return score === 21;
}

function checkBust(score){
    return score > 21;
}

function checkWin(playerScore, dealerScore){
    if(playerScore > dealerScore){
        return 'You Win!';
    } else if(playerScore < dealerScore){
        return 'You Lose!';
    } else {
        return 'Draw!';
    }
}

function startGame(){
    createDeck();
    shuffleDeck();
    playerHand.push(dealCard());
    dealerHand.push(dealCard());
    playerHand.push(dealCard());
    dealerHand.push(dealCard());
    playerScore = calculateScore(playerHand);
    dealerScore = calculateScore(dealerHand);
    if(checkBlackJack(playerScore)){
        gameOver = true;
    }
}

function hit(){
    if(playerTurn){
        playerHand.push(dealCard());
        playerScore = calculateScore(playerHand);
        if(checkBust(playerScore)){
            gameOver = true;
        }
    }
}

function stand(){
    playerTurn = false;
    while(dealerScore < 17){
        dealerHand.push(dealCard());
        dealerScore = calculateScore(dealerHand);
    }
    gameOver = true;
}

function resetGame(){
    deck = [];
    playerHand = [];
    dealerHand = [];
    playerScore = 0;
    dealerScore = 0;
    playerTurn = true;
    gameOver = false;
}

function getGameInfo(){
    return {
        playerHand: playerHand,
        dealerHand: dealerHand,
        playerScore: playerScore,
        dealerScore: dealerScore,
        playerTurn: playerTurn,
        gameOver: gameOver
    };
}

module.exports = {
    startGame,
    hit,
    stand,
    resetGame,
    getGameInfo
};

