const { merge } = require("lodash");
const Utils = require("./utils");
const Draw = require("./draw");

const DEFAULT_LEFT_SQUARES = [
  {
    x: 300,
    y: 100,
    size: 100,
    offset: 10,
    xGrow: -4,
    yGrow: 5,
    sizeGrow: 3,
    offsetGrow: 0.5,
  },
];

const DEFAULT_RIGHT_SQUARES = [
  {
    x: 800,
    y: 50,
    size: 30,
    offset: 1,
    xGrow: 4,
    yGrow: 5,
    sizeGrow: 3,
    offsetGrow: 0.5,
  },
];

class Obstacle {
  constructor(ctx) {
    this.ctx = ctx;
    this.leftSquares = [merge({}, DEFAULT_LEFT_SQUARES[0])];
    this.rightSquares = [merge({}, DEFAULT_RIGHT_SQUARES[0])];
  }

  moveSquare(square) {
    square.x = square.x + square.xGrow;
    square.y = square.y + square.yGrow;
    square.size = square.size + square.sizeGrow;
    square.offset = square.offset + square.offsetGrow;
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
      this.moveSquare(square);
      if (square.size > 300) {
        this.leftSquares[idx] = merge({}, DEFAULT_LEFT_SQUARES[idx]);
      }
    });
  }

  stepRightSquares() {
    this.rightSquares.forEach((square, idx) => {
      Draw.drawRightSquare(this.ctx, square);
      this.moveSquare(square);
      if (square.size > 300) {
        this.rightSquares[idx] = merge({}, DEFAULT_RIGHT_SQUARES[idx]);
      }
    });
  }
}

module.exports = Obstacle;
