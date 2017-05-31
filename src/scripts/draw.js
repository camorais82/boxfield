const Utils = require("./utils");

const Draw = {
  drawLeftSquare: (ctx, { x, y, size, offset }) => {
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#84e0e9";
    ctx.lineJoin = "round";
    ctx.fillStyle = "#fff";
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
    ctx.fillStyle = "#fff";
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

  drawPlayer: (ctx, player) => {
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#84e0e9";
    ctx.fillStyle = "#84e0e9";
    ctx.lineJoin = "round";
    ctx.moveTo(...player.origin);
    player.points.forEach(xyPair => ctx.lineTo(...xyPair));
    ctx.lineTo(...player.origin);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
  },

  drawField: (ctx, offset) => {
    const levels = [];
    let multiplier = 1.1;

    let baseLevel = Utils.height / 10 + offset;

    levels.push(baseLevel - offset);

    for (let i = 1; i < 28; i++) {
      levels.push(baseLevel);
      baseLevel = baseLevel * multiplier;
    }

    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#f4f4f4";
    ctx.lineJoin = "round";
    levels.forEach(level => Draw.drawFieldLine(ctx, level));
    ctx.stroke();
  },

  drawFieldLine: (ctx, y) => {
    ctx.moveTo(0, y);
    ctx.lineTo(Utils.width, y);
  },
};

module.exports = Draw;
