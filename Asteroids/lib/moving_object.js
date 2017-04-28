function MovingObject(options) {
  this.pos = options['pos'];
  this.vel = options['vel'];
  this.radius = options['radius'];
  this.color = options['color'];
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
};



module.exports = MovingObject;
