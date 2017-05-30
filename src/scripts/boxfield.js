require("../styles/main.scss");
const Obstacle = require("./obstacle");
const Utils = require("./utils");

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("field");
  canvas.width = Utils.width;
  canvas.height = Utils.height;

  const ctx = canvas.getContext("2d");
  const obstacle = new Obstacle(ctx);

  window.requestAnimationFrame(() => obstacle.animate());
});
