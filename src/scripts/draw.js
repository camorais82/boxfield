const Utils = require("./utils");

// Helper that contains all actual canvas drawing methods
// Keeps classes free of drawing clutter
const Draw = {
  drawSquare: (ctx, { front, top, side }, bonus) => {
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = bonus ? "#88F295" : "#84e0e9";
    ctx.lineJoin = "round";
    ctx.fillStyle = "#fff";

    // Draw front face
    ctx.moveTo(...front[0]);
    ctx.lineTo(...front[1]);
    ctx.lineTo(...front[2]);
    ctx.lineTo(...front[3]);
    ctx.closePath();

    // Draw top face
    ctx.moveTo(...top[0]);
    ctx.lineTo(...top[1]);
    ctx.lineTo(...top[2]);
    ctx.lineTo(...top[3]);
    ctx.closePath();

    // Draw side face
    ctx.moveTo(...side[0]);
    ctx.lineTo(...side[1]);
    ctx.lineTo(...side[2]);
    ctx.lineTo(...side[3]);
    ctx.closePath();

    ctx.fill();
    ctx.stroke();
  },

  drawPlayer: (ctx, player) => {
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#84e0e9";
    ctx.fillStyle = "#84e0e9";
    ctx.lineJoin = "round";
    ctx.moveTo(...player.points.all[0]);
    player.points.all.forEach(xyPair => ctx.lineTo(...xyPair));
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
