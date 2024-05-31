const gameArea = document.getElementById('gameArea');
const startButton = document.getElementById('startButton');
let startTime;
let endTime;

function startGame() {
  gameArea.innerHTML = '';
  startButton.style.display = 'none';
  setTimeout(() => {
    gameArea.style.backgroundColor = 'red';
    startTime = Date.now();
  }, Math.random() * 2000 + 1000);
}

function endGame() {
  endTime = Date.now();
  const reactionTime = endTime - startTime;
  gameArea.innerHTML = `Your reaction time is ${reactionTime}ms`;
  gameArea.style.backgroundColor = 'white';
  startButton.style.display = 'block';
}