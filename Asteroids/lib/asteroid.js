const movingObject = require('./moving_object.js');
const Util = require('./utils.js');

function Asteroid(pos, game) {
  this.pos = pos;
  this.color = Asteroid.COLOR;
  this.radius = Asteroid.RADIUS;
  this.game = game;
  movingObject.call(this,
    {pos: this.pos,
    vel: randomVec(5),
    color: this.color,
    radius: this.radius,
    game: this.game
  });
}
Util.inherits(Asteroid, movingObject);
Asteroid.COLOR = "FF0000";
Asteroid.RADIUS = 40;

// Return a randomly oriented vector with the given length.
const randomVec = function (length) {
  const deg = 2 * Math.PI * Math.random();
  return Util.scale([Math.sin(deg), Math.cos(deg)], length);
};
// Scale the length of a vector by the given amount.

module.exports = Asteroid;
