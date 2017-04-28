const Asteroid = require('./asteroid.js');

function Game() {
  this.asteroids = [];
  this.addAsteroids();
}

Game.DIM_X = 600;
Game.DIM_Y = 600;
Game.NUM_ASTEROIDS = 10;

Game.prototype.addAsteroids = function() {
  for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
    this.asteroids.push(new Asteroid(randPos()));
  }
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  this.asteroids.forEach( asteroid => asteroid.draw(ctx) );
};

Game.prototype.moveObjects = function() {
  this.asteroids.forEach( asteroid => asteroid.move() );
};

const randPos = function() {
  let x = Math.floor(Math.random() * Game.DIM_X);
  let y = Math.floor(Math.random() * Game.DIM_Y);
  return [x, y];
};

module.exports = Game;
