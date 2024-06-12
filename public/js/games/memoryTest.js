let tiles = document.getElementById('tiles');
let tile = document.getElementsByClassName('tile');
let mistakes = document.getElementById('mistakes');
let score = document.getElementById('score');
let gameOver = document.getElementById('gameOver');

window.onload = function() {
    let gridRow = 3;
    let gridSize = gridRow**2;
    score.innerHTML = 0;
    loadTiles(gridSize);
    game(gridSize);
    gridSize++;
}

function loadTiles(gridSize){
    mistakes.innerHTML = 0;
    let isTilesEmpty = true;
    if (tiles.getElementsByClassName('tile').length > 0) {
        isTilesEmpty = false;
    }
    for (let i = 0; i < gridSize; i++) {
        if (!isTilesEmpty) {
            let tile = document.getElementById(i);
            if (tile){
                tile.remove();
            }
        }
        let loadingTile = document.createElement('div');
        loadingTile.classList.add('tile');
        loadingTile.id = i;
        tiles.appendChild(loadingTile);
    }
    tiles.style.gridTemplateColumns = `repeat(${Math.sqrt(gridSize)}, 1fr)`;
    tiles.style.gridTemplateRows = `repeat(${Math.sqrt(gridSize)}, 1fr)`;
}

function game(gridSize){
    let upgradableGrid = [0 , 1, 4, 9, 16, 25, 36, 49, 64, 81, 100];
    let rightTilesNum = Number(score.innerHTML) + 3;
    console.log(rightTilesNum);
    let rightTiles = [];
    let wrongTiles = 0;
    let chosenRightTiles = 0;
    for (let i = 0; i < rightTilesNum; i++) {
        let randomTile = Math.floor(Math.random() * gridSize);
        while (rightTiles.includes(randomTile)) {
            randomTile = Math.floor(Math.random() * gridSize);
        }
        rightTiles.push(randomTile);
        let rightTile = document.getElementById(rightTiles[i]);
        rightTile.classList.add('right');
    }
    setTimeout(function () {
        let rightElements = document.querySelectorAll('.right');
        rightElements.forEach(function (element) {
            element.style.backgroundColor = '#211951';
        });
    }, 1500);
    for (let i = 0; i < tile.length; i++) {
        tile[i].addEventListener('click', function () {
            if (rightTiles.includes(i)) {
                this.style.backgroundColor = '#15F5BA';
                chosenRightTiles++;
                if (chosenRightTiles === rightTilesNum) {
                    score.innerText++;
                    if (upgradableGrid.includes(Number(score.innerHTML))) {
                        gridSize = (Math.sqrt(gridSize)+1)**2;
                    }
                    loadTiles(gridSize);
                    game(gridSize);
                }
            } else {
                mistakes.innerHTML++;
                if (Number(mistakes.innerHTML) > 2) {
                    console.log('Game Over');
                    endGame();
                }
                let thisTile = this;
                this.style.backgroundColor = '#F51515';
                setTimeout(function () {
                    thisTile.style.backgroundColor = '#211951';
                }, 1000);
            }
        });
    }
}

function endGame(){
    tiles.style.display = 'none';
    document.getElementById('finalScore').innerText = score.innerHTML;
    gameOver.style.display = 'block';
}