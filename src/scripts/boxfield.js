require("../styles/main.scss");
const Obstacle = require("./obstacle");
const Draw = require('./draw');
const Utils = require("./utils");
const Field = require('./field');

document.addEventListener("DOMContentLoaded", () => {
  const fieldCanvas = document.getElementById("field");
  fieldCanvas.width = Utils.width;
  fieldCanvas.height = Utils.height;

  const fieldCtx = fieldCanvas.getContext("2d");
  const field = new Field(fieldCtx);
  window.requestAnimationFrame(() => field.animate());

  const objCanvas = document.getElementById("objects");
  objCanvas.width = Utils.width;
  objCanvas.height = Utils.height;

  const objCtx = objCanvas.getContext("2d");
  const obstacle = new Obstacle(objCtx);
  window.requestAnimationFrame(() => obstacle.animate());
});
