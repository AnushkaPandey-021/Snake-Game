const board = document.getElementById('gameBoard');
const boardSize = 20;
let snake = [{x: 10, y: 10}];
let food = {x: 15, y: 15};
let dx = 0;
let dy = 0;
let score = 0;

function draw() {
  board.innerHTML = '';
  
  snake.forEach(segment => {
    const snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = segment.y;
    snakeElement.style.gridColumnStart = segment.x;
    snakeElement.classList.add('snake');
    board.appendChild(snakeElement);
  });

  const foodElement = document.createElement('div');
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add('food');
  board.appendChild(foodElement);

  const scoreElement = document.createElement('div');
  scoreElement.textContent = `Score: ${score}`;
  scoreElement.classList.add('score');
  board.appendChild(scoreElement);
}

function moveSnake() {
  const head = {x: snake[0].x + dx, y: snake[0].y + dy};
  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score += 10;
    generateFood();
  } else {
    snake.pop();
  }
}

function generateFood() {
  food.x = Math.floor(Math.random() * boardSize) + 1;
  food.y = Math.floor(Math.random() * boardSize) + 1;
}

function checkCollision() {
  if (
    snake[0].x < 1 || 
    snake[0].x > boardSize || 
    snake[0].y < 1 || 
    snake[0].y > boardSize ||
    snake.slice(1).some(segment => segment.x === snake[0].x && segment.y === snake[0].y)
  ) {
    clearInterval(gameInterval);
    alert('Game Over! Your final score: ' + score);
  }
}

document.addEventListener('keydown', event => {
  if (event.key === 'ArrowUp' && dy !== 1) {
    dx = 0;
    dy = -1;
  }
  if (event.key === 'ArrowDown' && dy !== -1) {
    dx = 0;
    dy = 1;
  }
  if (event.key === 'ArrowLeft' && dx !== 1) {
    dx = -1;
    dy = 0;
  }
  if (event.key === 'ArrowRight' && dx !== -1) {
    dx = 1;
    dy = 0;
  }
});

let gameInterval = setInterval(() => {
  moveSnake();
  checkCollision();
  draw();
}, 100);
