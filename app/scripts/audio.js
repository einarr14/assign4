'use strict';

var muted = true;

function mute(){
	 var music = document.getElementById('mainsound');
     var check = document.getElementById('checksound');
     var flap = document.getElementById('flapsound');
     var hit = document.getElementById('hitsound');
     var muteButton = document.getElementById('muteButton');
     var unmuteButton = document.getElementById('unmuteButton');
     
     console.log('hi');
   
	if (muted === false) {
		console.log('muting');
        music.muted = true;
        check.muted = true;
        flap.muted = true;
        hit.muted = true;
        muted = true;
        muteButton.style.visibility = 'visible';
        unmuteButton.style.visibility = 'hidden';
        

    }
    else if (muted === true) {
        console.log('unmuting');
        music.muted = false;
        check.muted = false;
        flap.muted = false;
        hit.muted = false;
        muted = false;
     	muteButton.style.visibility = 'hidden';
        unmuteButton.style.visibility = 'visible';
    }
}

