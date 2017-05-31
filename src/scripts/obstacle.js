const { merge } = require("lodash");
const Utils = require("./utils");
const Draw = require("./draw");

// Contains default properties and methods to grow / reset the obstacle
class Obstacle {
  constructor() {
    this.properties = this.generateProperties();
  }

  generateProperties() {
    const properties = this.generateDefault();

    return Math.random() > 0.5
      ? merge(properties, this.generateLeft())
      : merge(properties, this.generateRight());
  }

  generateDefault() {
    return {
      y: Utils.height / 10,
      size: 15,
      offset: 3,
      yGrow: 1.01,
      sizeGrow: 1.01,
      offsetGrow: 1.01,
      spawnOffset: Math.random() * 300,
    };
  }

  generateRight() {
    return {
      x: Math.random() * Utils.width / 2.2 + Utils.width / 2.2,
      xGrow: Utils.height / Utils.width,
      type: "RIGHT",
    };
  }

  generateLeft() {
    return {
      x: Math.random() * Utils.width / 1.8,
      xGrow: -(Utils.height / Utils.width),
      type: "LEFT",
    };
  }

  move() {
    const { properties } = this;
    if (properties.spawnOffset > 0) {
      properties.spawnOffset = properties.spawnOffset - 1;
    } else {
      properties.x = properties.x + properties.xGrow;
      properties.y = properties.y * properties.yGrow;
      properties.size = properties.size * properties.sizeGrow;
      properties.offset = properties.offset * properties.offsetGrow;
    }

    if (this.properties.size > 300) {
      this.properties = merge({}, this.generateProperties());
    }
  }

  animate(ctx) {
    this.draw(ctx);
    this.move();
  }

  draw(ctx) {
    if (this.properties.spawnOffset <= 0) {
      if (this.properties.type === "LEFT") {
        Draw.drawLeftSquare(ctx, this.properties);
      } else {
        Draw.drawRightSquare(ctx, this.properties);
      }
    }
  }

  moveLeft() {
    const { properties } = this;
    if (properties.spawnOffset <= 0) {
      if (properties.type === "LEFT") {
        properties.x = properties.x - properties.xGrow * 10;
      } else {
        properties.x = properties.x + properties.xGrow * 10;
      }
    }
  }

  moveRight() {
    const { properties } = this;
    if (properties.spawnOffset <= 0) {
      if (properties.type === "LEFT") {
        properties.x = properties.x + properties.xGrow * 10;
      } else {
        properties.x = properties.x - properties.xGrow * 10;
      }
    }
  }
}

module.exports = Obstacle;
