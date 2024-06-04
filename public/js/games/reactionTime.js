document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.getElementById("startButton");
  const reactionBox = document.getElementById("reactionBox");
  const result = document.getElementById("result");

  let startTime;
  let timeout;

  startButton.addEventListener("click", startGame);
  reactionBox.addEventListener("click", recordReaction);

  function startGame() {
    result.textContent = "";
    reactionBox.style.display = "none";
    startButton.style.display = "none";

    const randomDelay = Math.random() * 3000 + 2000; // Delay between 2 and 5 seconds
    timeout = setTimeout(showReactionBox, randomDelay);
  }

  function showReactionBox() {
    startTime = Date.now();
    reactionBox.style.display = "block";
    reactionBox.addEventListener("click", recordReaction);
  }

  function recordReaction() {
    const reactionTime = Date.now() - startTime;
    result.textContent = `Temps de réaction: ${reactionTime} ms`;
    reactionBox.style.display = "none";
    startButton.style.display = "block";
    clearTimeout(timeout);
    reactionBox.removeEventListener("click", recordReaction);
  }
});
