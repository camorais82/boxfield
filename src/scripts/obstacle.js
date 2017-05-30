const { merge } = require("lodash");
const Utils = require("./utils");
const Draw = require("./draw");

const DEFAULT_LEFT_SQUARES = [
  {
    x: 300,
    y: 50,
    size: 30,
    offset: 5,
    xGrow: 4,
    yGrow: 1.02,
    sizeGrow: 1.025,
    offsetGrow: 1.025,
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
    sizeGrow: 1.025,
    offsetGrow: 1.025,
  },
];

class Obstacle {
  constructor(ctx) {
    this.ctx = ctx;
    this.leftSquares = [merge({}, DEFAULT_LEFT_SQUARES[0])];
    this.rightSquares = [merge({}, DEFAULT_RIGHT_SQUARES[0])];
  }

  moveRightSquare(square) {
    square.x = square.x + square.xGrow;
    square.y = square.y * square.yGrow;
    square.size = square.size * square.sizeGrow;
    square.offset = square.offset * square.offsetGrow;
  }

  moveLeftSquare(square) {
    square.x = square.x - square.xGrow;
    square.y = square.y * square.yGrow;
    square.size = square.size * square.sizeGrow;
    square.offset = square.offset * square.offsetGrow;
  }

  animate() {
    setInterval(() => {
      this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      this.stepLeftSquares();
      this.stepRightSquares();
    }, 40);
  }

  stepLeftSquares() {
    this.leftSquares.forEach((square, idx) => {
      Draw.drawLeftSquare(this.ctx, square);
      this.moveLeftSquare(square);
      if (square.size > 300) {
        this.leftSquares[idx] = merge({}, DEFAULT_LEFT_SQUARES[idx]);
      }
    });
  }

  stepRightSquares() {
    this.rightSquares.forEach((square, idx) => {
      Draw.drawRightSquare(this.ctx, square);
      this.moveRightSquare(square);
      if (square.size > 300) {
        this.rightSquares[idx] = merge({}, DEFAULT_RIGHT_SQUARES[idx]);
      }
    });
  }
}

module.exports = Obstacle;
