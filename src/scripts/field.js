const Draw = require("./draw");
const Utils = require("./utils")

class Field {
  constructor(ctx) {
    this.ctx = ctx;
    this.offset = 0;
  }

  animate() {
    window.requestAnimationFrame(() => this.animate());


    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    Draw.drawField(this.ctx, this.offset);
    this.offset += 1;
    if (this.offset > 7) {
      this.offset = 0;
    }
  }
}

module.exports = Field;