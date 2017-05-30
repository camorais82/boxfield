require("../styles/main.scss");
const Obstacle = require("./obstacle");
const Utils = require("./utils");

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext("2d");

  const obstacle = new Obstacle(ctx);

  obstacle.animate();
});
