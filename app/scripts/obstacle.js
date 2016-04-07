window.Obstacle = (function() {
	'use strict';

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	var SPEED = 20; // * 10 pixels per second
	var WIDTH = 10;
	var HEIGHT = 25;
	var GAPSIZE = 20;
	var INITIAL_POSITION_X = 70;
	var INITIAL_POSITION_Y = 25;

	var Obstacle = function(el, game, cord, topObst) {
		this.el = el;
		this.game = game;
		this.pos = { x: cord, y: 0};
		this.height = this.getY();
		if (typeof topObst !== 'undefined') {
			this.pos.y = topObst.height + GAPSIZE;
			this.height = this.game.WORLD_HEIGHT - this.pos.y;
		}
		this.width = WIDTH;
		this.topObst = topObst;
		this.speed = SPEED;
		this.el.css('height', this.height + 'em');
	};

	Obstacle.prototype.reset = function(cord, topObst) {
		this.pos.x = cord;
		this.pos.y = 0;
		this.height = this.getY();
		if (typeof topObst !== 'undefined') {
			this.pos.y = topObst.height + GAPSIZE;
			this.height = this.game.WORLD_HEIGHT - this.pos.y;
		}
		this.el.css('height', this.height + 'em');
	};

	Obstacle.prototype.onFrame = function(delta, topObst) {
		
		this.pos.x -= delta * SPEED;
		if (this.pos.x < -10) {
			this.pos.x += 150;
			this.pos.y = 0;
			this.height = this.getY();
			if (typeof this.topObst !== 'undefined') {
				this.pos.y = topObst.height + GAPSIZE;
				this.height = this.game.WORLD_HEIGHT - this.pos.y;
			}
			this.el.css('height', this.height + 'em');
		}

		// Update UI
		this.el.css('transform', 'translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
	};

	Obstacle.prototype.getY = function() {
		return Math.floor((Math.random() * 15) + 5);
	};


	return Obstacle;
})();