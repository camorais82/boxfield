const Draw = require("./draw");
const Utils = require("./utils");

class Field {
  constructor() {
    this.offset = 0;
  }

  animate(ctx) {
    Draw.drawField(ctx, this.offset);
    this.offset += Utils.height / 850;
    if (this.offset > Utils.height / 100) {
      this.offset = 0;
    }
  }
}

module.exports = Field;
