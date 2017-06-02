const Field = require("./field");
const Obstacle = require("./obstacle");
const Player = require("./player");
const Utils = require("./utils");

// Handles top level game logic
class Game {
  constructor() {
    this.highScore = 0;
    this.newGame();
  }

  newGame() {
    this.obstacles = this.populateObstacles(20);
    this.field = new Field();
    this.player = new Player();
    this.score = 0;
    this.gameStart = false;
    this.initiateHallway = false;
  }

  detectCollision() {
    const { obstacles } = this;
    for (let i = 0; i < obstacles.length; i++) {
      if (obstacles[i].properties.y > Utils.height / 3 * 2) {
        if (this.player.isCollideWith(obstacles[i])) {
          if (obstacles[i].bonus) {
            obstacles[i].properties.y = 0;
            obstacles[i].properties.spawnOffset = 99999;
            obstacles[i].properties.size = 1000;
            this.score = this.score + 1000;
          } else {
            return true;
          }
        }
      }
    }
    return false;
  }

  populateObstacles(n, hasBonus = true) {
    const obstacles = [];
    for (let i = 0; i < n; i++) {
      const obstacle = new Obstacle();
      if (!hasBonus) {
        obstacle.bonus = false;
      }
      obstacles.push(obstacle);
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
    this.incrementScore();
    if (this.detectCollision()) {
      if (this.score > this.highScore) {
        this.highScore = this.score;
      }
      this.endGame();
    }
    if (this.score % 1000 === 0 || this.score < 10) {
      this.initiateHallway = true;
      this.stopObstacleSpawn();
    }
    if (this.initiateHallway) {
      this.generateHallway();
    }
  }

  generateHallway() {
    if (this.isFieldClear()) {
      const pos = Math.random() * Utils.width;
      this.obstacles = this.populateObstacles(70, false);
      this.generateLeftHallwayPieces(pos);
      this.generateRightHallwayPieces(pos);
    }
  }

  generateLeftHallwayPieces(pos) {
    let spawnIncrement = 5;
    let xIncrement = 0;
    for (let i = 0; i < this.obstacles.length / 2; i++) {
      if (i < 16) {
        this.obstacles[i].generateLeftHallway(xIncrement);
        xIncrement += pos / 16;
      } else {
        this.obstacles[i].generateLeftHallway(pos);
      }
      this.obstacles[i].properties.spawnOffset = spawnIncrement;
      spawnIncrement += 5;
    }
  }

  generateRightHallwayPieces(pos) {
    let spawnIncrement = 5;
    let xIncrement = Utils.width;
    for (let i = this.obstacles.length / 2; i < this.obstacles.length; i++) {
      if (i < this.obstacles.length / 2 + 16) {
        this.obstacles[i].generateRightHallway(xIncrement);
        xIncrement -= (Utils.width - pos) / 16;
      } else {
        this.obstacles[i].generateRightHallway(pos);
      }
      this.obstacles[i].properties.spawnOffset = spawnIncrement;
      spawnIncrement += 5;
    }
  }

  stopObstacleSpawn() {
    this.obstacles.forEach(obstacle => (obstacle.respawn = false));
  }

  isFieldClear() {
    for (let i = 0; i < this.obstacles.length; i++) {
      if (this.obstacles[i].properties.size < 300) {
        return false;
      }
    }
    return true;
  }
}

module.exports = Game;
