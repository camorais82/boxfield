const { merge } = require("lodash");
const Utils = require("./utils");
const Draw = require("./draw");

const DEFAULT_LEFT_SQUARES = [
  {
    x: 300,
    y: 50,
    size: 30,
    offset: 5,
    xGrow: -4,
    yGrow: 1.02,
    sizeGrow: 1.020,
    offsetGrow: 1.020,
    spawnOffset: 50,
  },
  {
    x: 500,
    y: 50,
    size: 30,
    offset: 5,
    xGrow: -4,
    yGrow: 1.02,
    sizeGrow: 1.020,
    offsetGrow: 1.020,
    spawnOffset: 10,
  },
];

const DEFAULT_RIGHT_SQUARES = [
  {
    x: 800,
    y: 50,
    size: 30,
    offset: 5,
    xGrow: 4,
    yGrow: 1.02,
    sizeGrow: 1.020,
    offsetGrow: 1.020,
    spawnOffset: 20,
  },
  {
    x: 900,
    y: 50,
    size: 30,
    offset: 5,
    xGrow: 4,
    yGrow: 1.02,
    sizeGrow: 1.020,
    offsetGrow: 1.020,
    spawnOffset: 10,
  },
];

class Obstacle {
  constructor(ctx) {
    this.ctx = ctx;
    this.leftSquares = merge([], DEFAULT_LEFT_SQUARES);
    this.rightSquares = merge([], DEFAULT_RIGHT_SQUARES);
  }

  moveSquare(square) {
    if (square.spawnOffset > 0) {
      square.spawnOffset = square.spawnOffset - 1;
    } else {
      square.x = square.x + square.xGrow;
      square.y = square.y * square.yGrow;
      square.size = square.size * square.sizeGrow;
      square.offset = square.offset * square.offsetGrow;
    }
  }

  animate() {
    setInterval(() => {
      this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      Draw.drawPlayer(this.ctx);
      this.stepLeftSquares();
      this.stepRightSquares();
    }, 40);
  }

  stepLeftSquares() {
    this.leftSquares.forEach((square, idx) => {
      if (square.spawnOffset <= 0) {
        Draw.drawLeftSquare(this.ctx, square);
      }
      this.moveSquare(square);
      if (square.size > 300) {
        this.leftSquares[idx] = merge({}, DEFAULT_LEFT_SQUARES[idx]);
      }
    });
  }

  stepRightSquares() {
    this.rightSquares.forEach((square, idx) => {
      if (square.spawnOffset <= 0) {
        Draw.drawRightSquare(this.ctx, square);
      }
      this.moveSquare(square);
      if (square.size > 300) {
        this.rightSquares[idx] = merge({}, DEFAULT_RIGHT_SQUARES[idx]);
      }
    });
  }
}

module.exports = Obstacle;
