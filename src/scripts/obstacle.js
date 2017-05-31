const { merge } = require("lodash");
const Utils = require("./utils");
const Draw = require("./draw");

// Contains default properties and methods to grow / reset the obstacle
class Obstacle {
  constructor() {
    this.resetSquare();
  }

  resetSquare() {
    return Math.random() > 0.5 ? this.generateLeft() : this.generateRight();
  }

  generateDefault() {
    return {
      y: Utils.height / 10,
      size: 15,
      yGrow: 1.01,
      sizeGrow: 1.01,
      offsetGrow: 1.01,
      spawnOffset: Math.random() * 300,
    };
  }

  generateLeft() {
    const defaults = this.generateDefault();
    const x = Math.random() * Utils.width / 1.8;
    const properties = merge(defaults, {
      x,
      offset: -3,
      xGrow: -(Utils.height / Utils.width),
      type: "LEFT",
    });
    this.properties = properties;
    this.generateLeftPoints();
  }

  generateRight() {
    const defaults = this.generateDefault();
    const x = Math.random() * Utils.width / 2.2 + Utils.width / 2.2;
    const properties = merge(defaults, {
      x,
      offset: 3,
      xGrow: Utils.height / Utils.width,
      type: "RIGHT",
    });
    this.properties = properties;
    this.generateRightPoints();
  }

  generateLeftPoints() {
    const { x, y, size, offset } = this.properties;
    this.properties.points = {
      front: [[x, y], [x, y + size], [x + size, y + size], [x + size, y]],
      top: [
        [x, y],
        [x + offset, y + offset],
        [x + offset + size, y + offset],
        [x + size, y],
      ],
      side: [
        [x + offset, y + offset],
        [x + offset, y + offset + size],
        [x, y + size],
        [x, y],
      ],
    };
  }

  generateRightPoints() {
    const { x, y, size, offset } = this.properties;
    this.properties.points = {
      front: [[x, y], [x, y + size], [x + size, y + size], [x + size, y]],
      top: [
        [x, y],
        [x + offset, y - offset],
        [x + offset + size, y - offset],
        [x + size, y],
      ],
      side: [
        [x + offset + size, y - offset],
        [x + offset + size, y - offset + size],
        [x + size, y + size],
        [x + size, y],
      ],
    };
  }

  move() {
    const { properties } = this;
    if (properties.spawnOffset > 0) {
      properties.spawnOffset = properties.spawnOffset - 1;
    } else {
      this.grow();
      this.properties.type === "LEFT"
        ? this.generateLeftPoints()
        : this.generateRightPoints();
    }

    if (this.properties.size > 300) {
      this.resetSquare();
    }
  }

  grow() {
    const { properties } = this;
    properties.x = properties.x + properties.xGrow;
    properties.y = properties.y * properties.yGrow;
    properties.size = properties.size * properties.sizeGrow;
    properties.offset = properties.offset * properties.offsetGrow;
  }

  animate(ctx) {
    this.draw(ctx);
    this.move();
  }

  draw(ctx) {
    if (this.properties.spawnOffset <= 0) {
      Draw.drawSquare(ctx, this.properties.points);
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
