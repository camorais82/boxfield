# Boxfield
[Link to Boxfield](http://boxfield.jinchen.io)

Boxfield is an HTML5 twist on the popular Flash game Cubefield.
The main objective of the game is to avoid the blue boxes. Players can also score points faster by eating green boxes which are worth 1000 points.

## Features and Implementation
### Obstacles
Obstacles are inherited from a Piece parent prototype. Each box on the screen is an Obstacle instance. All obstacles are generated with a default generator function:
```js
// ./src/scripts/obstacle.js

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
```

Left and right facing obstacles all inherit these default properties but have differing `x`, `xGrow`, and `offset` properties.

### Animations
To achieve the animations, two canvases were overlapped on each. Each animation tick cleared the canvases and redrew the objects with their new properties.

#### Obstacle Animation
Randomly spawned obstacles are achieved by setting a random `spawnOffset` property on each obstacle. When `spawnOffset` reaches `0`, the obstacle is drawn onto the screen and begins its animation.

The 3D effect was achieved by growing the boxes with each tick against their set `fooGrow` properties.
```js
// ./src/scripts/obstacle.js

grow() {
  const { properties } = this;
  properties.x = properties.x + properties.xGrow;
  properties.y = properties.y * properties.yGrow;
  properties.size = properties.size * properties.sizeGrow;
  properties.offset = properties.offset * properties.offsetGrow;
}
```

#### Field Animation

The infinite field scrolling animation was achieved by pushing the field down with each tick by an increasing offset and then having it reset back to `0`.
```js
// ./src/scripts/field.js

animate(ctx) {
  Draw.drawField(ctx, this.offset);
  this.offset += Utils.height / 875;
  if (this.offset > Utils.height / 100) {
    this.offset = 0;
  }
}
```

The field itself does not look like it is being pushed downwards because a baselevel is drawn on every tick.

```js
// ./src/scripts/draw.js

let baseLevel = Utils.height / 10;
levels.push(baseLevel);

baseLevel += offset;
for (let i = 1; i < 28; i++) {
  levels.push(baseLevel);
  baseLevel = baseLevel * multiplier;
}
```

### Collision Detection
A collision detection check is applied on every obstacle below 2/3's of the screen's height. The collision detection is performed by checking all of the vectors belonging to an object against all of the other vectors of the object it is being compared to.

```js
// ./src/scripts/piece.js

isCollideWith(piece) {
  const allVectors = this.allVectors();
  const pieceVectors = piece.allVectors();

  for (let i = 0; i < allVectors.length; i++) {
    const vector = allVectors[i];
    for (let j = 0; j < pieceVectors.length; j++) {
      const pieceVector = pieceVectors[j];
      if (
        Utils.intersects(vector[0], vector[1], pieceVector[0], pieceVector[1])
      ) {
        return true;
      }
    }
  }
  return false;
}
```

Once a collision is detected, the appropriate action is taken depending on if its a normal obstacle or bonus obstacle.

## Design
[Link to the Design Documentation](https://github.com/jinchen93/boxfield/tree/master/docs)

## Technologies
HTML 5 Canvas and its `CanvasRenderingContext2D` API was used for drawing and animations.

Webpack is used to bundle all imports and exports into a single file.

Lodash provides utility functions.

Node-sass to compile `.scss` files.

## Additional Features
In the future I would like to implement these features:
- Powerups
- Player sprites
- Themed levels