const movingObject = require('./moving_object.js');
const Util = require('./utils.js');

function Ship(pos, game, vel = [0,0]) {
  this.radius = Ship.RADIUS;
  this.color = Ship.COLOR;
  this.vel = vel;
  this.pos = pos;
  this.game = game;
}
Util.inherits(Ship, movingObject);

Ship.prototype.relocate = function() {
  // debugger
  this.pos = this.game.randPos();
  this.vel = [0, 0];
};

Ship.RADIUS = 5;
Ship.COLOR = "Blue";

module.exports = Ship;
