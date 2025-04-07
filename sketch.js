// Snake Game Example with P5.js

let snake;
let food;
let resolution = 20;
let w, h;
let gameOver = false;

function setup() {
  createCanvas(600, 400);
  frameRate(10);
  w = floor(width / resolution);
  h = floor(height / resolution);
  snake = new Snake();
  foodLocation();
}

function foodLocation() {
  food = createVector(floor(random(w)), floor(random(h)));
}

function keyPressed() {
  if (keyCode === LEFT_ARROW && snake.xdir !== 1) snake.setDir(-1, 0);
  else if (keyCode === RIGHT_ARROW && snake.xdir !== -1) snake.setDir(1, 0);
  else if (keyCode === DOWN_ARROW && snake.ydir !== -1) snake.setDir(0, 1);
  else if (keyCode === UP_ARROW && snake.ydir !== 1) snake.setDir(0, -1);
  
  if (key === ' ' && gameOver) {
    resetGame();
  }
}

function draw() {
  scale(resolution);
  background(220);

  if (!gameOver) {
    if (snake.eat(food)) foodLocation();
    snake.update();
    snake.show();
    if (snake.endGame()) {
      gameOver = true;
    }

    // Draw food
    noStroke();
    fill(255, 0, 0);
    rect(food.x, food.y, 1, 1);

    // Score
    fill(0);
    textSize(1);
    text('Score: ' + (snake.body.length - 1), 1, 1);
  } else {
    fill(255, 0, 0);
    textSize(2);
    textAlign(CENTER);
    text('Game Over!', w / 2, h / 2);
    textSize(1);
    text('Score: ' + (snake.body.length - 1), w / 2, h / 2 + 2);
    text('Press SPACE to restart', w / 2, h / 2 + 4);
  }
}

function resetGame() {
  snake = new Snake();
  foodLocation();
  gameOver = false;
}

class Snake {
  constructor() {
    this.body = [createVector(floor(w / 2), floor(h / 2))];
    this.xdir = 0;
    this.ydir = 0;
    this.grow = false;
  }

  setDir(x, y) {
    this.xdir = x;
    this.ydir = y;
  }

  update() {
    let head = this.body[this.body.length - 1].copy();
    head.x += this.xdir;
    head.y += this.ydir;
    this.body.push(head);

    if (!this.grow) {
      this.body.shift();
    }
    this.grow = false;
  }

  show() {
    fill(0, 100, 0);
    for (let part of this.body) {
      rect(part.x, part.y, 1, 1);
    }
  }

  eat(pos) {
    let head = this.body[this.body.length - 1];
    if (head.x === pos.x && head.y === pos.y) {
      this.grow = true;
      return true;
    }
    return false;
  }

  endGame() {
    let head = this.body[this.body.length - 1];
    // Wall collision
    if (head.x < 0 || head.x >= w || head.y < 0 || head.y >= h) {
      return true;
    }
    // Self collision
    for (let i = 0; i < this.body.length - 1; i++) {
      let part = this.body[i];
      if (part.x === head.x && part.y === head.y) {
        return true;
      }
    }
    return false;
  }
}
