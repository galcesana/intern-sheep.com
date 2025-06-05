// script.js

// ======================
// Configuration
// ======================
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const GRID_SIZE = 20;           // number of cells per row/column
const CELL_SIZE = canvas.width / GRID_SIZE; // 400 / 20 = 20px per cell
const INITIAL_SPEED = 150;      // milliseconds between moves (the lower = faster)

// Image assets
const sheepImg = new Image();
sheepImg.src = '/static/images/snake%20game/sheep.png';     // sheep sprite (32x32 recommended)
const grassImg = new Image();
grassImg.src = '/static/images/snake%20game/grass.png';  

// ======================
// Game state
// ======================
let sheep = [ { x: 10, y: 10 } ];   // array of cells: head = index 0
let direction = { x: 0, y: -1 };    // initial direction: up
let grass = spawnGrass();
let score = 0;
let speed = INITIAL_SPEED;
let moveIntervalId = null;
let gameOver = false;

// DOM Elements
const scoreEl = document.getElementById('score');
const gameOverEl = document.getElementById('gameOver');
const restartBtn = document.getElementById('restartBtn');

// ======================
// Input handling
// ======================
document.addEventListener('keydown', (e) => {
  if (gameOver) return;

  switch (e.key) {
    case 'ArrowUp':
    case 'w':
    case 'W':
      if (direction.y === 1) break; // prevent reversing
      direction = { x: 0, y: -1 };
      break;
    case 'ArrowDown':
    case 's':
    case 'S':
      if (direction.y === -1) break;
      direction = { x: 0, y: 1 };
      break;
    case 'ArrowLeft':
    case 'a':
    case 'A':
      if (direction.x === 1) break;
      direction = { x: -1, y: 0 };
      break;
    case 'ArrowRight':
    case 'd':
    case 'D':
      if (direction.x === -1) break;
      direction = { x: 1, y: 0 };
      break;
  }
});

// Restart button
restartBtn.addEventListener('click', () => {
  resetGame();
});

// ======================
// Main game loop
// ======================
function startGame() {
  // Reset everything
  sheep = [ { x: 10, y: 10 } ];
  direction = { x: 0, y: -1 };
  grass = spawnGrass();
  score = 0;
  updateScore();
  gameOver = false;
  gameOverEl.classList.add('hidden');

  // Clear any existing interval
  if (moveIntervalId) clearInterval(moveIntervalId);

  moveIntervalId = setInterval(() => {
    update();
    draw();
  }, speed);
}

function resetGame() {
  clearInterval(moveIntervalId);
  startGame();
}

// Update game state on each tick
function update() {
  // Calculate new head position
  const head = { x: sheep[0].x + direction.x, y: sheep[0].y + direction.y };

  // Check wall collisions
  if (
    head.x < 0 ||
    head.x >= GRID_SIZE ||
    head.y < 0 ||
    head.y >= GRID_SIZE
  ) {
    endGame();
    return;
  }

  // Check self-collision
  for (let segment of sheep) {
    if (segment.x === head.x && segment.y === head.y) {
      endGame();
      return;
    }
  }

  // Add new head
  sheep.unshift(head);

  // Check if we ate grass
  if (head.x === grass.x && head.y === grass.y) {
    score += 1;
    updateScore();
    grass = spawnGrass();
    // Optionally speed up slightly every time
    // clearInterval(moveIntervalId);
    // speed = Math.max(50, speed - 5);
    // moveIntervalId = setInterval(() => { update(); draw(); }, speed);

  } else {
    // Remove tail segment (if no grass eaten)
    sheep.pop();
  }
}

// Draw everything
function draw() {
  // Clear full canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw grass
  ctx.drawImage(
    grassImg,
    grass.x * CELL_SIZE,
    grass.y * CELL_SIZE,
    CELL_SIZE,
    CELL_SIZE
  );

  // Draw sheep (each segment)
  for (let i = 0; i < sheep.length; i++) {
    const segment = sheep[i];
    ctx.drawImage(
      sheepImg,
      segment.x * CELL_SIZE,
      segment.y * CELL_SIZE,
      CELL_SIZE,
      CELL_SIZE
    );
  }
}

// ======================
// Helpers
// ======================
// Randomly place grass somewhere not occupied by the sheep
function spawnGrass() {
  let newPos;
  while (true) {
    newPos = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
    // Make sure it’s not on the sheep
    let collision = sheep.some((segment) => segment.x === newPos.x && segment.y === newPos.y);
    if (!collision) break;
  }
  return newPos;
}

function updateScore() {
  scoreEl.textContent = `Score: ${score}`;
}

function endGame() {
  gameOver = true;
  gameOverEl.style.display = 'block';
  restartBtn.style.display = 'block';
  clearInterval(moveIntervalId);
}

// ======================
// Wait for images to load, then start
// ======================
let assetsLoaded = 0;
[sheepImg, grassImg].forEach((img) => {
  img.onload = () => {
    assetsLoaded += 1;
    if (assetsLoaded === 2) {
      startGame();
    }
  };
  img.onerror = () => {
    console.error(`Failed to load ${img.src}. Make sure the file exists.`);
  };
});
// // Ensure canvas is cleared on resize     
// window.addEventListener('resize', () => {
//   canvas.width = 400; // Reset to original size
//   canvas.height = 400; // Reset to original size
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
// });