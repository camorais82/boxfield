const Draw = {
  drawLeftSquare: (ctx, { x, y, size, offset }) => {
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#84e0e9";
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
    ctx.stroke();
  },

  drawRightSquare: (ctx, { x, y, size, offset }) => {
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#84e0e9";
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
    ctx.stroke();
  },
};

module.exports = Draw;
