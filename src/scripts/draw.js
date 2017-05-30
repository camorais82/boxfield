const Utils = require("./utils");

const Draw = {
  drawLeftSquare: (ctx, { x, y, size, offset }) => {
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#84e0e9";
    ctx.lineJoin = "round";
    ctx.fillStyle = "#000";
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + size);
    ctx.lineTo(x + size, y + size);
    ctx.lineTo(x + size, y);
    ctx.lineTo(x, y);
    ctx.lineTo(x - offset, y - offset);
    ctx.lineTo(x - offset, y - offset);
    ctx.lineTo(x - offset + size, y - offset);
    ctx.lineTo(x + size, y);
    ctx.moveTo(x - offset, y - offset);
    ctx.lineTo(x - offset, y - offset + size);
    ctx.lineTo(x, y + size);
    ctx.lineTo(x, y);
    ctx.lineTo(x - offset, y - offset);
    ctx.fill();
    ctx.stroke();
  },

  drawRightSquare: (ctx, { x, y, size, offset }) => {
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#84e0e9";
    ctx.lineJoin = "round";
    ctx.fillStyle = "#000";
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + size);
    ctx.lineTo(x + size, y + size);
    ctx.lineTo(x + size, y);
    ctx.lineTo(x, y);
    ctx.lineTo(x + offset, y - offset);
    ctx.lineTo(x + offset + size, y - offset);
    ctx.lineTo(x + size, y);
    ctx.moveTo(x + offset + size, y - offset);
    ctx.lineTo(x + offset + size, y + size - offset);
    ctx.lineTo(x + size, y + size);
    ctx.lineTo(x + size, y);
    ctx.lineTo(x + size + offset, y - offset);
    ctx.fill();
    ctx.stroke();
  },

  drawPlayer: ctx => {
    const x = Utils.width / 2;
    const y = Utils.height - 150;
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#84e0e9";
    ctx.fillStyle = "#84e0e9";
    ctx.lineJoin = "round";
    ctx.moveTo(x, y);
    ctx.lineTo(x + 40, y + 100);
    ctx.lineTo(x, y + 70);
    ctx.lineTo(x - 40, y + 100);
    ctx.lineTo(x, y);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
  },

  drawField: ctx => {

  }
};

module.exports = Draw;
