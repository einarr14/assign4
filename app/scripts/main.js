
/**
 * Bootstrap and start the game.
 */
$(function() {
    'use strict';

    var mainSound = document.getElementById('mainsound');
    mainSound.volume = 0.5;
    var game = new window.Game($('.GameCanvas'));
    game.start();
});
