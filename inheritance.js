Function.prototype.inherits = function(parent) {
  this.prototype = Object.create(parent.prototype);
  this.prototype.constructor = this;
};

function MovingObject () {}
MovingObject.prototype.moves = function() {
  console.log("moving");
};

function Ship () {}
Ship.inherits(MovingObject);
Ship.prototype.fires = function() {
  console.log("pew pew");
};

function Asteroid () {}
Asteroid.inherits(MovingObject);
Asteroid.prototype.smash = function() {
  console.log("pow");
};

let m = new MovingObject();
let s = new Ship();
let a = new Asteroid();

m.moves();
s.moves();
a.moves();

// m.fires();
s.fires();
// a.fires();

// m.smash();
// s.smash();
a.smash();
