const Field = require("./field");
const Obstacle = require("./obstacle");
const Player = require("./player");
const Utils = require("./utils");

// Handles top level game logic
class Game {
  constructor() {
    this.newGame();
  }

  newGame() {
    this.obstacles = this.populateObstacles();
    this.field = new Field();
    this.player = new Player();
    this.score = 0;
    this.gameStart = false;
  }

  detectCollision() {
    const { obstacles } = this;
    for (let i = 0; i < obstacles.length - 1; i++) {
      if (this.player.isCollideWith(obstacles[i])) {
        return true;
      }
    }
    return false;
  }

  populateObstacles() {
    const obstacles = [];
    for (let i = 0; i < 20; i++) {
      obstacles.push(new Obstacle());
    }
    return obstacles;
  }

  moveLeft() {
    this.obstacles.forEach(obstacle => obstacle.moveLeft());
  }

  moveRight() {
    this.obstacles.forEach(obstacle => obstacle.moveRight());
  }

  incrementScore() {
    this.score++;
  }

  start() {
    if (this.score > 0 && !this.gameStart) {
      this.newGame();
    }
    this.gameStart = true;
  }

  endGame() {
    this.gameStart = false;
  }

  tick() {
    if (this.detectCollision()) {
      this.endGame();
    }
    this.incrementScore();
  }
}

module.exports = Game;
