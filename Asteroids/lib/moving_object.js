const Util = require('./utils.js');

function MovingObject(options) {
  this.pos = options['pos'];
  this.vel = options['vel'];
  this.radius = options['radius'];
  this.color = options['color'];
  this.game = options['game'];
}

MovingObject.prototype.draw = function(ctx) {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2*Math.PI);
  ctx.fill();
};


MovingObject.prototype.move = function() {
  let dx = this.vel[0];
  let dy = this.vel[1];
  this.pos[0] += dx;
  this.pos[1] += dy;
  this.pos = this.game.wrap(this.pos);
};

MovingObject.prototype.isCollidedWith = function (otherObject) {
  return Util.distance(this, otherObject) < (this.radius + otherObject.radius);
};

MovingObject.prototype.collideWith = function(otherObject) {
};

module.exports = MovingObject;
