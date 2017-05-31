const Game = require("./game");
const Utils = require("./utils");

class GameView {
  constructor({ fieldCtx, objCtx }) {
    this.gameStart = false;
    this.fieldCtx = fieldCtx;
    this.objCtx = objCtx;
    this.game = new Game();
    this.bindKeyHandlers();
  }

  start() {
    this.gameStart = !this.gameStart;
  }

  animate() {
    const { game } = this;
    window.requestAnimationFrame(() => this.animate());
    this.clearCanvas();

    if (this.gameStart) {
      game.incrementScore();
      this.animateObstacles();
      game.player.animate(this.objCtx);
    }
    game.field.animate(this.fieldCtx);
  }

  clearCanvas() {
    this.fieldCtx.clearRect(0, 0, Utils.width, Utils.height);
    this.objCtx.clearRect(0, 0, Utils.width, Utils.height);
  }

  animateObstacles() {
    const inOrderObstacles = this.game.obstacles.sort(
      (a, b) => a.properties.size - b.properties.size
    );

    inOrderObstacles.forEach(obs => obs.animate(this.objCtx));
  }

  bindKeyHandlers() {
    document.addEventListener("keydown", e => {
      if (e.key === "a") {
        this.game.moveLeft();
      }
      if (e.key === "d") {
        this.game.moveRight();
      }
      if (e.key === " ") {
        this.start();
      }
    });
  }
}

module.exports = GameView;
