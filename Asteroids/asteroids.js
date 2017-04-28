const MovingObject = require('./lib/moving_object.js');
const Asteroid = require('./lib/asteroid.js');
const Game = require('./lib/game.js');
const GameView = require('./lib/game_view.js');

document.addEventListener("DOMContentLoaded", function(event) {
   let canvas = document.getElementById("game-canvas");
   let ctx = canvas.getContext("2d");
   let game = new GameView(ctx);
   game.start();
 });


window.MovingObject = MovingObject;
window.Asteroid = Asteroid;
window.Game = Game;
