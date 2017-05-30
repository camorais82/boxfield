const { merge } = require("lodash");
const Utils = require("./utils");
const Draw = require("./draw");

const DEFAULT_LEFT_SQUARES = [
  {
    x: Math.random() * Utils.width / 2,
    y: 50,
    size: 30,
    offset: 5,
    xGrow: -(Utils.height / Utils.width / 2),
    yGrow: 1.01,
    sizeGrow: 1.0075,
    offsetGrow: 1.0075,
    spawnOffset: 50,
  },
  {
    x: Math.random() * Utils.width / 2,
    y: 50,
    size: 30,
    offset: 5,
    xGrow: -(Utils.height / Utils.width / 2),
    yGrow: 1.01,
    sizeGrow: 1.0075,
    offsetGrow: 1.0075,
    spawnOffset: 10,
  },
];

const DEFAULT_RIGHT_SQUARES = [
  {
    x: (Math.random() * Utils.width / 2) + Utils.width / 2,
    y: 50,
    size: 30,
    offset: 5,
    xGrow: -(Utils.height / Utils.width / 2),
    yGrow: 1.01,
    sizeGrow: 1.0075,
    offsetGrow: 1.0075,
    spawnOffset: 20,
  },
  {
    x: (Math.random() * Utils.width / 2) + Utils.width / 2,
    y: 50,
    size: 30,
    offset: 5,
    xGrow: -(Utils.height / Utils.width / 2),
    yGrow: 1.01,
    sizeGrow: 1.0075,
    offsetGrow: 1.0075,
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
    window.requestAnimationFrame(() => this.animate());
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    Draw.drawPlayer(this.ctx);
    this.stepLeftSquares();
    this.stepRightSquares();
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
