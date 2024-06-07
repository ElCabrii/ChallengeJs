let randomNumbers = [];
let sortedNumbers = [];
let currentIndices = [];
let sortedIndices = [];

let inputNumbers = document.getElementById('box');


for (let i = 0; i < 100; i++) {
    let span = document.createElement('span');
    span.id = 'num';
    span.textContent = i;
    inputNumbers.appendChild(span);
}
let inputNum = inputNumbers.getElementsByTagName('span');
let index = 50;
arraySize = document.getElementById('num').value;

// Generate random numbers and update UI when the page loads
window.onload = generateRandomNumbers;

// Add CSS for the moving and sorted classes
const style = document.createElement('style');
document.head.appendChild(style);


function nextNum(){
    inputNum[index].style.display = 'none';
    index = (index+1) % inputNum.length;
    inputNum[index].style.display = 'initial';
    changeArraySize();
}

function prevNum(){
    inputNum[index].style.display = 'none';
    index = (index-1+inputNum.length) % inputNum.length;
    inputNum[index].style.display = 'initial';
    changeArraySize();
}

function changeArraySize() {
    arraySize = document.getElementById('num').value;
    generateRandomNumbers();
}

function generateRandomNumbers() {
    randomNumbers = [];
    sortedIndices = []; // Reset sorted indices
    for (let i = 0; i < arraySize; i++) {
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
                sortedIndices.push(n - 1 - i); // Mark the current element as sorted
                j = 0;
                i++;
            }
            updateUI();
            setTimeout(sortStep, 10); // Adjust the delay as needed
        } else {
            sortedIndices.push(0); // Mark the last remaining element as sorted
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
        } else if (sortedIndices.includes(index)) {
            return `<span class="sorted">${num}</span>`;
        } else {
            return num;
        }
    });

    document.getElementById('sortedArray').innerHTML = sortedArrayElements.join(', ');
}
