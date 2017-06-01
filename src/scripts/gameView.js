const Game = require("./game");
const Utils = require("./utils");
const Draw = require("./draw");

// Renders the game logic out onto the screen
class GameView {
  constructor({ fieldCtx, objCtx, scoreEle, instructionEle, endEle }) {
    this.fieldCtx = fieldCtx;
    this.objCtx = objCtx;
    this.game = new Game();
    this.bindKeyHandlers();
    this.scoreEle = scoreEle;
    this.instructionEle = instructionEle;
    this.endEle = endEle;
  }

  animate() {
    const { game } = this;

    window.requestAnimationFrame(() => this.animate());
    this.clearCanvas();
    this.renderScore();

    game.field.animate(this.fieldCtx);
    if (game.gameStart) {
      game.tick();
      this.animateObstacles();
      game.player.animate(this.objCtx);
    }

    if (!game.gameStart && game.highScore) {
      this.renderEndScreen();
    }
  }

  clearCanvas() {
    this.fieldCtx.clearRect(0, 0, Utils.width, Utils.height);
    this.objCtx.clearRect(0, 0, Utils.width, Utils.height);
  }

  renderScore() {
    this.scoreEle.innerHTML = `Score: ${this.game.score}`;
  }

  renderEndScreen() {
    this.endEle.className = "info end-game";
    this.endEle.innerHTML =
      `Your score is ${this.game.score}` +
      `<br><br> Your highest score is ${this.game.highScore}`;
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
      if (e.key === " " || e.key === "Enter") {
        this.instructionEle.className = "hidden";
        this.endEle.className = "hidden";
        this.game.start();
      }
    });
  }
}

module.exports = GameView;
