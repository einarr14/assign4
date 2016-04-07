window.Player = (function() {
	'use strict';

	var Controls = window.Controls;

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	var SPEED = 0; // * 10 pixels per second
	var ROTATION = 0;
	var WIDTH = 5;
	var HEIGHT = 5;
	var INITIAL_POSITION_X = 30;
	var INITIAL_POSITION_Y = 25;

	var Player = function(el, game) {
		this.el = el;
		this.game = game;
		this.start = false;
		this.pos = { x: 0, y: 0 };
	};

	/**
	 * Resets the state of the player for a new game.
	 */
	Player.prototype.reset = function() {
		this.pos.x = INITIAL_POSITION_X;
		this.pos.y = INITIAL_POSITION_Y;
		this.width = WIDTH;
		this.height = HEIGHT;
		this.start = false;
		SPEED = 0;
		ROTATION = 0;
		$('#Instructions').css('visibility', 'visible');
	};

	Player.prototype.onFrame = function(delta) {
		if (Controls.keys.space || Controls.keys.click || Controls.keys.tap) {
			var sound = document.getElementById('flapsound');
			sound.currentTime = 0;
			sound.play();
			SPEED = 60;
			ROTATION = -50;
			this.start = true;
			$('#Instructions').css('visibility', 'hidden');
		}
		if (this.start === true) {
			SPEED -= 5;
			ROTATION += (delta * 100);
		}
		this.pos.y -= delta * SPEED;
		this.checkCollisionWithBounds();

		// Update UI
		this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em) rotateZ(' + ROTATION + 'deg)');
	};

	Player.prototype.checkCollisionWithBounds = function() {
		if (this.pos.x < 0 ||
			this.pos.x + WIDTH > this.game.WORLD_WIDTH ||
			this.pos.y + HEIGHT > this.game.WORLD_HEIGHT) {
			return this.game.gameover();
		}
	};

	return Player;

})();
