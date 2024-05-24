let randomNumbers = [];
let sortedNumbers = [];

function generateRandomNumbers() {
  randomNumbers = [];
  for (let i = 0; i < 100; i++) {
    randomNumbers.push(Math.floor(Math.random() * 100));
  }
}

function bubbleSort(arr) {
  const n = arr.length;
  let swapped;
  do {
    swapped = false;
    for (let i = 0; i < n - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]]; // Swap using destructuring assignment
        swapped = true;
      }
    }
  } while (swapped);
  return arr;
}

function sort() {
  generateRandomNumbers();
  sortedNumbers = bubbleSort(randomNumbers.slice()); // Clone the array to avoid modifying the original
  updateUI();
}

function updateUI() {
  document.getElementById('unsortedArray').textContent = randomNumbers.join(', ');
  document.getElementById('sortedArray').textContent = sortedNumbers.join(', ');
}

// Add event listener to the button
document.getElementById('triButton').addEventListener('click', sort);
