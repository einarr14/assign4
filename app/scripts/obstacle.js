window.Obstacle = (function() {
	'use strict';

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	var SPEED = 5; // * 10 pixels per second
	var WIDTH = 5;
	var HEIGHT = 5;
	var INITIAL_POSITION_X = 70;
	var INITIAL_POSITION_Y = 25;

	var Obstacle = function(el, game) {
		this.el = el;
		this.game = game;
		this.pos = { x: 50, y: 50 };
	};

	Obstacle.prototype.onFrame = function(delta) {
		
		this.pos.x -= delta * SPEED;

		// Update UI
		this.el.css('transform', 'translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
	};


	return Obstacle;

})();