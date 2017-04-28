const Util = {
  inherits(childClass, parentClass) {
    childClass.prototype = Object.create(parentClass.prototype);
    childClass.prototype.constructor = childClass;
  },

  scale(vec, m) {
    return [vec[0] * m, vec[1] * m];
  },

  distance(obj1, obj2) {
    let x1 = obj1.pos[0];
    let x2 = obj2.pos[0];
    let y1 = obj1.pos[1];
    let y2 = obj2.pos[1];
    let xDist = Math.pow((x1 - x2), 2);
    let yDist = Math.pow((y1 - y2), 2);
    return Math.sqrt(xDist + yDist);
  }
};



module.exports = Util;
