require("../styles/main.scss");
const Utils = require("./utils");
const GameView = require("./gameView");

// Basic initialization + grabbing DOM elements to feed into
// the gameView instance
document.addEventListener("DOMContentLoaded", () => {
  const fieldCanvas = document.getElementById("field");
  fieldCanvas.width = Utils.width;
  fieldCanvas.height = Utils.height;
  const fieldCtx = fieldCanvas.getContext("2d");

  const objCanvas = document.getElementById("objects");
  objCanvas.width = Utils.width;
  objCanvas.height = Utils.height;
  const objCtx = objCanvas.getContext("2d");

  const scoreEle = document.querySelector(".score");
  const instructionEle = document.querySelector(".instructions");
  const endEle = document.querySelector(".end-game");
  const gameView = new GameView({
    fieldCtx,
    objCtx,
    scoreEle,
    instructionEle,
    endEle,
  });

  gameView.animate();
});
