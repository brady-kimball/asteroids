/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const movingObject = __webpack_require__(1);
const Util = __webpack_require__(4);
const Ship = __webpack_require__(6)

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
Asteroid.COLOR = "#FF0000";
Asteroid.RADIUS = 20;

Asteroid.prototype.collideWith = function(otherObject) {
  // debugger
  if (otherObject instanceof Ship) {
    // debugger
    otherObject.relocate();
  }
};

// Return a randomly oriented vector with the given length.
const randomVec = function (length) {
  const deg = 2 * Math.PI * Math.random();
  return Util.scale([Math.sin(deg), Math.cos(deg)], length);
};

module.exports = Asteroid;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(4);

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


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Asteroid = __webpack_require__(0);
const Ship = __webpack_require__(6);


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


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(1);
const Asteroid = __webpack_require__(0);
const Game = __webpack_require__(2);
const GameView = __webpack_require__(5);

document.addEventListener("DOMContentLoaded", function(event) {
   let canvas = document.getElementById("game-canvas");
   let ctx = canvas.getContext("2d");
   let game = new GameView(ctx);
   game.start();
 });


window.MovingObject = MovingObject;
window.Asteroid = Asteroid;
window.Game = Game;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

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


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(2);

function GameView(ctx) {
  this.game = new Game();
  this.ctx = ctx;
}

GameView.prototype.start = function() {
  setInterval(() => {
    this.game.step();
    this.game.draw(this.ctx);
  }, 20);
};


module.exports = GameView


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const movingObject = __webpack_require__(1);
const Util = __webpack_require__(4);

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

Ship.RADIUS = 10;
Ship.COLOR = "Blue";

module.exports = Ship;


/***/ })
/******/ ]);