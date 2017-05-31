const Field = require("./field");
const Obstacle = require("./obstacle");
const Player = require("./player");
const Utils = require("./utils");

class Game {
  constructor() {
    this.obstacles = this.populateObstacles();
    this.field = new Field();
    this.player = new Player();
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
}

module.exports = Game;
