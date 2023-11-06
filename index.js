const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Размер клетки на поле
const gridSize = 20;

// Начальное положение змейки
let snake = [  { x: 6, y: 6 },  { x: 5, y: 6 },  { x: 4, y: 6 }];

// Начальное положение фрукта
let fruit = { x: 10, y: 10 };

// Начальное направление движение змейки
let dx = 1;
let dy = 0;

// Функция для отрисовки игрового поля
function draw() {
  // Очистка игрового поля
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Отрисовка змейки
  snake.forEach((segment) => {
    ctx.fillStyle = "green";
    ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
  });

  // Отрисовка фрукта
  ctx.fillStyle = "red";
  ctx.fillRect(fruit.x * gridSize, fruit.y * gridSize, gridSize, gridSize);
}

// Функция для обновления состояния игры
function update() {
  // Передвижение змейки
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);
  snake.pop();

  // Обработка столкновения с фруктом
  if (head.x === fruit.x && head.y === fruit.y) {
    // Увеличение длины змейки и смена положения фрукта
    snake.push({});
    randomizeFruitPosition();
  }
}

// Функция для изменения направления движение змейки
function handleDirectionChange(event) {
  const key = event.keyCode;
  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;
  const UP_KEY = 38;
  const DOWN_KEY = 40;

  if (key === LEFT_KEY && dx !== 1) {
    dx = -1;
    dy = 0;
  }

  if (key === RIGHT_KEY && dx !== -1) {
    dx = 1;
    dy = 0;
  }

  if (key === UP_KEY && dy !== 1) {
    dx = 0;
    dy = -1;
  }

  if (key === DOWN_KEY && dy !== -1) {
    dx = 0;
    dy = 1;
  }
}

// Функция для генерации случайного положения фрукта
function randomizeFruitPosition() {
  fruit.x = Math.floor(Math.random() * (canvas.width / gridSize));
  fruit.y = Math.floor(Math.random() * (canvas.height / gridSize));
}

// Запуск игрового цикла
function gameLoop() {
  update();
  draw();
}

// Начало игры
randomizeFruitPosition();
setInterval(gameLoop, 100);  // Запуск игрового цикла каждые 100 миллисекунд

// Обработчик событий для изменения направления движения змейки
document.addEventListener("keydown", handleDirectionChange);