let randomNumbers = [];
let sortedNumbers = [];
let currentIndices = [];

function generateRandomNumbers() {
    randomNumbers = [];
    for (let i = 0; i < 100; i++) {
        randomNumbers.push(Math.floor(Math.random() * 100));
    }
    sortedNumbers = randomNumbers.slice(); // Initialize sortedNumbers with the generated random numbers
    updateUI(); // Update the UI to show the unsorted numbers
}

function bubbleSortWithDelay(arr) {
    const n = arr.length;
    let i = 0, j = 0;

    function sortStep() {
        if (i < n - 1) {
            if (j < n - 1 - i) {
                currentIndices = [j, j + 1];
                if (arr[j] > arr[j + 1]) {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; // Swap using destructuring assignment
                }
                j++;
            } else {
                j = 0;
                i++;
            }
            updateUI();
            setTimeout(sortStep, 25); // Adjust the delay as needed
        } else {
            currentIndices = [];
            updateUI();
        }
    }
    sortStep();
}

function sort() {
    bubbleSortWithDelay(sortedNumbers);
}

function updateUI() {


    const sortedArrayElements = sortedNumbers.map((num, index) => {
        if (currentIndices.includes(index)) {
            return `<span class="moving">${num}</span>`;
        } else {
            return num;
        }
    });

    document.getElementById('sortedArray').innerHTML = sortedArrayElements.join(', ');
}

// Add event listener to the button
document.getElementById('triButton').addEventListener('click', sort);

// Add CSS for the moving class
const style = document.createElement('style');

document.head.appendChild(style);

// Generate random numbers and update UI when the page loads
window.onload = generateRandomNumbers;
