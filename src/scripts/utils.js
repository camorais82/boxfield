// Helper for misc methods
const Utils = {
  width: window.innerWidth,
  height: window.innerHeight,
  intersects: function(aLineStart, aLineEnd, bLineStart, bLineEnd) {
    const a = aLineStart[0];
    const b = aLineStart[1];
    const c = aLineEnd[0];
    const d = aLineEnd[1];
    const p = bLineStart[0];
    const q = bLineStart[1];
    const r = bLineEnd[0];
    const s = bLineEnd[1];

    const delta = (c - a) * (s - q) - (r - p) * (d - b);
    if (delta === 0) {
      return false;
    } else {
      const lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / delta;
      const gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / delta;
      return 0 < lambda && lambda < 1 && (0 < gamma && gamma < 1);
    }
  },
};

module.exports = Utils;
