const Utils = require("./utils");

class Piece {
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

  allVectors() {
    let vectors = [];
    const { all } = this.properties.points;
    for (let i = 0; i < all.length - 1; i++) {
      for (let j = i + 1; j < all.length - 2; j++) {
        vectors.push([all[i], all[j]]);
      }
    }
    return vectors;
  }
}

module.exports = Piece;
