const Asteroid = require('./asteroid.js');
const Ship = require('./ship.js');


function Game() {
  this.ship = new Ship(this.randPos(), this);
  this.asteroids = [];
  this.addAsteroids();
}

Game.DIM_X = 600;
Game.DIM_Y = 600;
Game.NUM_ASTEROIDS = 20;

Game.prototype.addAsteroids = function() {
  for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
    this.asteroids.push(new Asteroid(this.randPos(), this));
  }
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  this.allObjects().forEach( asteroid => asteroid.draw(ctx) );
};

Game.prototype.moveObjects = function() {
  this.allObjects().forEach( asteroid => asteroid.move() );
};

Game.prototype.wrap = function(pos) {
  let x = pos[0];
  let y = pos[1];
  let wrappedX;
  let wrappedY;
  if(x < 0) {
    wrappedX = Game.DIM_X + (x % Game.DIM_X);
  } else {
    wrappedX = (x % Game.DIM_X);
  }

  if(y < 0) {
    wrappedY = Game.DIM_Y + (y % Game.DIM_Y);
  } else {
    wrappedY = (y % Game.DIM_Y);
  }
  return [wrappedX, wrappedY];
};

Game.prototype.randPos = function() {
  let x = Math.floor(Math.random() * Game.DIM_X);
  let y = Math.floor(Math.random() * Game.DIM_Y);
  return [x, y];
};

Game.prototype.checkCollisions = function() {
  this.allObjects().forEach ((asteroid1) => {
    this.allObjects().forEach ((asteroid2) => {
        if (asteroid1 === asteroid2) {
          return;
        } else {
          if (asteroid1.isCollidedWith(asteroid2)) {
            asteroid1.collideWith(asteroid2);
          }
        }
    });
  });
};

Game.prototype.remove = function(asteroid) {
  let i = this.asteroids.indexOf(asteroid);
  this.asteroids.splice(i, 1);
};

Game.prototype.step = function() {
  this.moveObjects();
  this.checkCollisions();
};

Game.prototype.allObjects = function() {
  return this.asteroids.concat([this.ship]);
};

module.exports = Game;
