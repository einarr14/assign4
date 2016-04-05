window.Obstacle = (function() {
	'use strict';

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	var SPEED = 20; // * 10 pixels per second
	var WIDTH = 10;
	var HEIGHT = 25;
	var INITIAL_POSITION_X = 70;
	var INITIAL_POSITION_Y = 25;

	var Obstacle = function(el, game, cord) {
		this.el = el;
		this.game = game;
		this.pos = { x: cord, y: 5};
		this.width = WIDTH;
		this.height = HEIGHT;
		console.log("CORD");
	};

	Obstacle.prototype.reset = function(cord) {
		this.pos.x = cord;
		this.pos.y = 5;
	};

	Obstacle.prototype.onFrame = function(delta) {
		
		this.pos.x -= delta * SPEED;
		if (this.pos.x < -10) {
			this.pos.x += 150;
			this.pos.y = 5; //Math.floor((Math.random() * 10) + 10);
		}

		// Update UI
		this.el.css('transform', 'translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
	};


	return Obstacle;

})();