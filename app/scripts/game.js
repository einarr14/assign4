
window.Game = (function() {
	'use strict';

	/**
	 * Main game class.
	 * @param {Element} el jQuery element containing the game.
	 * @constructor
	 */
	var Game = function(el) {
		this.el = el;
		this.player = new window.Player(this.el.find('.Player'), this);
		this.obstacle1 = new window.Obstacle(this.el.find('#obstacle1'), this, 70);
		this.obstacle2 = new window.Obstacle(this.el.find('#obstacle2'), this, 120);
		this.obstacle3 = new window.Obstacle(this.el.find('#obstacle3'), this, 170);
		this.isPlaying = false;

		// Cache a bound onFrame since we need it each frame.
		this.onFrame = this.onFrame.bind(this);
	};

	/**
	 * Runs every frame. Calculates a delta and allows each game
	 * entity to update itself.
	 */
	Game.prototype.onFrame = function() {
		// Check if the game loop should stop.
		if (!this.isPlaying) {
			return;
		}

		// Calculate how long since last frame in seconds.
		var now = +new Date() / 1000,
				delta = now - this.lastFrame;
		this.lastFrame = now;

		// Update game entities.
		this.player.onFrame(delta);
		this.obstacle1.onFrame(delta);
		this.obstacle2.onFrame(delta);
		this.obstacle3.onFrame(delta);

		this.checkColisionWithObstacles();


		// Request next frame.
		window.requestAnimationFrame(this.onFrame);
	};

	Game.prototype.checkColisionWithObstacles = function () {
		if (this.player.pos.x > this.obstacle1.pos.x && this.player.pos.x < (this.obstacle1.pos.x + this.obstacle1.width)) {
			if (this.player.pos.y < this.obstacle1.pos.y || this.player.pos.y > (this.obstacle1.pos.y +this.obstacle1.height)) {
				return this.gameover();
			}
		}
		if (this.player.pos.x > this.obstacle2.pos.x && this.player.pos.x < (this.obstacle2.pos.x + this.obstacle2.width)) {

			if (this.player.pos.y < this.obstacle2.pos.y || this.player.pos.y > (this.obstacle2.pos.y + this.obstacle2.height)) {
				return this.gameover();
			}
		}
		if (this.player.pos.x > this.obstacle3.pos.x && this.player.pos.x < (this.obstacle3.pos.x + this.obstacle3.width)) {
			if (this.player.pos.y < this.obstacle3.pos.y || this.player.pos.y > (this.obstacle3.pos.y +this.obstacle3.height)) {
				return this.gameover();
			}
		}
	}

	/**
	 * Starts a new game.
	 */
	Game.prototype.start = function() {
		this.reset();

		// Restart the onFrame loop
		this.lastFrame = +new Date() / 1000;
		window.requestAnimationFrame(this.onFrame);
		this.isPlaying = true;
	};

	/**
	 * Resets the state of the game so a new game can be started.
	 */
	Game.prototype.reset = function() {
		this.player.reset();
		this.obstacle1.reset(70);
		this.obstacle2.reset(120);
		this.obstacle3.reset(170);
	};

	/**
	 * Signals that the game is over.
	 */
	Game.prototype.gameover = function() {
		this.isPlaying = false;

		// Should be refactored into a Scoreboard class.
		var that = this;
		var scoreboardEl = this.el.find('.Scoreboard');
		scoreboardEl
			.addClass('is-visible')
			.find('.Scoreboard-restart')
				.one('click', function() {
					scoreboardEl.removeClass('is-visible');
					that.start();
				});
	};

	/**
	 * Some shared constants.
	 */
	Game.prototype.WORLD_WIDTH = 102.4;
	Game.prototype.WORLD_HEIGHT = 57.6;

	return Game;
})();


