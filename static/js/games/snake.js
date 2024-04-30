const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');



const HeadImageUp = new Image();
HeadImageUp.src = '/static/img/snake_up.png';
const HeadImageDown = new Image();
HeadImageDown.src = '/static/img/snake_down.png';
const HeadImageLeft = new Image();
HeadImageLeft.src = '/static/img/snake_left.png';
const HeadImageRight = new Image();
HeadImageRight.src = '/static/img/snake_right.png';
const BodyImage = new Image();
BodyImage.src = '/static/img/body.png';
const AppleImage = new Image();
AppleImage.src = '/static/img/apple.png';


let box = 20;
let snake = [];
snake[0] = {x: 10 * box, y: 10 * box};
let food = {x: Math.floor(Math.random() * 20) * box, y: Math.floor(Math.random() * 20) * box};
let score = 0;
let d;
let game;
document.addEventListener('keydown', direction);
function direction(event) {
    let key = event.keyCode;
    if (key === 37 && d !== 'RIGHT') {
        d = 'LEFT';
    }
    if (key === 38 && d !== 'DOWN') {
        d = 'UP';
    }
    if (key === 39 && d !== 'LEFT') {
        d = 'RIGHT';
    }
    if (key === 40 && d !== 'UP') {
        d = 'DOWN';
    }
}

function draw() {
    context.clearRect(0, 0, 400, 400);
    for (let i = 0; i < snake.length; i++) {
        let img;
        if (i === 0) { // Utiliser l'image de la tête pour la première partie
            switch (d) {
                case 'UP':
                    img = HeadImageUp;
                    break;
                case 'DOWN':
                    img = HeadImageDown;
                    break;
                case 'LEFT':
                    img = HeadImageLeft;
                    break;
                case 'RIGHT':
                    img = HeadImageRight;
                    break;
            }
        } else { // le corps pour les autres
            img = BodyImage;
        }
        context.drawImage(img, snake[i].x, snake[i].y, box, box);
    }
    context.drawImage(AppleImage, food.x, food.y, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    let restartButton = document.getElementById('restart-button');
    if (d === 'LEFT') snakeX -= box;
    if (d === 'UP') snakeY -= box;
    if (d === 'RIGHT') snakeX += box;
    if (d === 'DOWN') snakeY += box;

    if (snakeX === food.x && snakeY === food.y) {
        score++;
        food = {x: Math.floor(Math.random() * 20) * box, y: Math.floor(Math.random() * 20) * box};
        document.getElementById('score').innerText = 'Score: ' + score;
    } else {
        snake.pop();
    }

    let newHead = {x: snakeX, y: snakeY};

    if (snakeX < 0 || snakeY < 0 || snakeX >= 400 || snakeY >= 400 || collision(newHead, snake)) {
        clearInterval(game);
    }

    snake.unshift(newHead);

}

function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) {
            return true;
        }
    }
    return false;
}

function restartGame() {
    // Réinitialisez l'état du jeu
    snake = [];
    snake[0] = {x: 10 * box, y: 10 * box};
    food = {x: Math.floor(Math.random() * 20) * box, y: Math.floor(Math.random() * 20) * box};
    score = 0;
    d = null;
    if (game) clearInterval(game);
    game = setInterval(draw, 100);
}
let restartButton = document.getElementById('restart-button');
restartButton.addEventListener('click', restartGame);
game = setInterval(draw, 100);