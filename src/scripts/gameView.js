const Game = require("./game");
const Utils = require("./utils");

// Renders the game logic out onto the screen
class GameView {
  constructor({ fieldCtx, objCtx, scoreEle }) {
    this.fieldCtx = fieldCtx;
    this.objCtx = objCtx;
    this.game = new Game();
    this.bindKeyHandlers();
    this.scoreEle = scoreEle;
  }

  animate() {
    const { game } = this;

    window.requestAnimationFrame(() => this.animate());
    this.clearCanvas();
    this.renderScore();

    if (game.gameStart) {
      game.tick();
      this.animateObstacles();
      game.player.animate(this.objCtx);
    }

    game.field.animate(this.fieldCtx);
  }

  clearCanvas() {
    this.fieldCtx.clearRect(0, 0, Utils.width, Utils.height);
    this.objCtx.clearRect(0, 0, Utils.width, Utils.height);
  }

  renderScore() {
    this.scoreEle.innerHTML = `Score: ${this.game.score}`;
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
        this.game.start();
      }
    });
  }
}

module.exports = GameView;
