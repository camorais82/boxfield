require("../styles/main.scss");
const Utils = require("./utils");
const GameView = require("./gameView");

document.addEventListener("DOMContentLoaded", () => {
  const fieldCanvas = document.getElementById("field");
  fieldCanvas.width = Utils.width;
  fieldCanvas.height = Utils.height;
  const fieldCtx = fieldCanvas.getContext("2d");

  const objCanvas = document.getElementById("objects");
  objCanvas.width = Utils.width;
  objCanvas.height = Utils.height;
  const objCtx = objCanvas.getContext("2d");

  const gameView = new GameView({
    fieldCtx,
    objCtx,
  });

  gameView.animate();
});
