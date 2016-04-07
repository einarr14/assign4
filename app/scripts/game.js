
window.Game = (function() {
	'use strict';

	/**
	 * Main game class.
	 * @param {Element} el jQuery element containing the game.
	 * @constructor
	 */
	var Game = function(el) {
		this.el = el;
		this.points = 0;
		this.highscore = 0;

		this.player = new window.Player(this.el.find('.Player'), this);
		this.obstacleTop1 = new window.Obstacle(this.el.find('#obstacle-top-1'), this, 70);
		this.obstacleTop2 = new window.Obstacle(this.el.find('#obstacle-top-2'), this, 120);
		this.obstacleTop3 = new window.Obstacle(this.el.find('#obstacle-top-3'), this, 170);
		this.obstacleBot1 = new window.Obstacle(this.el.find('#obstacle-bot-1'), this, 70, this.obstacleTop1);
		this.obstacleBot2 = new window.Obstacle(this.el.find('#obstacle-bot-2'), this, 120, this.obstacleTop2);
		this.obstacleBot3 = new window.Obstacle(this.el.find('#obstacle-bot-3'), this, 170, this.obstacleTop3);

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
		this.obstacleTop1.onFrame(delta);
		this.obstacleTop2.onFrame(delta);
		this.obstacleTop3.onFrame(delta);
		this.obstacleBot1.onFrame(delta, this.obstacleTop1);
		this.obstacleBot2.onFrame(delta, this.obstacleTop2);
		this.obstacleBot3.onFrame(delta, this.obstacleTop3);

		this.checkColisionWithObstacles();
		this.checkPoint(delta);


		// Request next frame.
		window.requestAnimationFrame(this.onFrame);
	};

	Game.prototype.checkColisionWithObstacles = function () {
		// Bottom side
		var playerX = this.player.pos.x + this.player.width;
		// Right side
		var playerY = this.player.pos.y + this.player.height;

		if (playerX > this.obstacleTop1.pos.x && this.player.pos.x < (this.obstacleTop1.pos.x + this.obstacleTop1.width)) {
			if (playerY > this.obstacleBot1.pos.y || this.player.pos.y < this.obstacleTop1.height) {
				return this.gameover();
			}
		}
		if (playerX > this.obstacleTop2.pos.x && this.player.pos.x < (this.obstacleTop2.pos.x + this.obstacleTop2.width)) {
			if (playerY > this.obstacleBot2.pos.y || this.player.pos.y < this.obstacleTop2.height) {
				return this.gameover();
			}
		}
		if (playerX > this.obstacleTop3.pos.x && this.player.pos.x < (this.obstacleTop3.pos.x + this.obstacleTop3.width)) {
			if (playerY > this.obstacleBot3.pos.y || this.player.pos.y < this.obstacleTop3.height) {
				return this.gameover();
			}
		}
	};

	Game.prototype.checkPoint = function (delta) {
		var sound = document.getElementById('checksound');
		if (this.obstacleTop1.pos.x + (delta * this.obstacleTop1.speed) >= this.player.pos.x && this.obstacleTop1.pos.x < this.player.pos.x) {
			this.points++;
			sound.play();
			$('#Score').html(this.points);
		}
		if (this.obstacleTop2.pos.x + (delta * this.obstacleTop2.speed) >= this.player.pos.x && this.obstacleTop2.pos.x < this.player.pos.x) {
			this.points++;
			console.log(this.points);
			$('#Score').html(this.points);
			//sound.currentTime = 0;
			sound.play();
		}
		if (this.obstacleTop3.pos.x + (delta * this.obstacleTop3.speed) >= this.player.pos.x && this.obstacleTop3.pos.x < this.player.pos.x) {
			this.points++;
			console.log(this.points);
			$('#Score').html(this.points);
			//sound.currentTime = 0;
			sound.play();
		}
		
	};

	/**
	 * Starts a new game.
	 */
	Game.prototype.start = function() {
		this.reset();
		$('#Score').html(this.points);
		// Restart the onFrame loop
		this.lastFrame = +new Date() / 1000;
		window.requestAnimationFrame(this.onFrame);
		this.isPlaying = true;
	};

	/**
	 * Resets the state of the game so a new game can be started.
	 */
	Game.prototype.reset = function() {
		this.points = 0;
		this.player.reset();
		this.obstacleTop1.reset(70);
		this.obstacleTop2.reset(120);
		this.obstacleTop3.reset(170);
		this.obstacleBot1.reset(70, this.obstacleTop1);
		this.obstacleBot2.reset(120, this.obstacleTop2);
		this.obstacleBot3.reset(170, this.obstacleTop3);
	};

	/**
	 * Signals that the game is over.
	 */
	Game.prototype.gameover = function() {
		//this.finalScore.update("Score: " + this.points);
		var sound = document.getElementById('hitsound');
		sound.play();

		if(this.highscore < this.points) {
			this.highscore = this.points;
		}

		$('#finalScore').html(this.points);
		$('#highScore').html(this.highscore);
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


