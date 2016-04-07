
window.Controls = (function() {
    'use strict';

    /**
     * Key codes we're interested in.
     */
    var KEYS = {
        32: 'space',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        27: 'tap',
        77: 'm',
        0: 'click'
        
    };

    /**
     * A singleton class which abstracts all player input,
     * should hide complexity of dealing with keyboard, mouse
     * and touch devices.
     * @constructor
     */
    var Controls = function() {
        this._didJump = false;
        this.muted = false;
        this.keys = {};
        $(window)
            .on('keydown', this._onKeyDown.bind(this))
            .on('keyup', this._onKeyUp.bind(this))
            .on('mousedown', this._onMouseDown.bind(this))
            .on('mouseup', this._onMouseUp.bind(this))
            .on('touchstart', this._onTapStart.bind(this))
            .on('touchend', this._onTapEnd.bind(this));
    };

    Controls.prototype._onKeyDown = function(e) {
        // Only jump if space wasn't pressed.
        if (e.keyCode === 32 && !this.keys.space) {
            this._didJump = true;
        }

        if (e.keyCode === 77 && !this.keys.m) {
            console.log ('here');
            var music = document.getElementById('mainsound');
            var check = document.getElementById('checksound');
            var flap = document.getElementById('flapsound');
            var hit = document.getElementById('hitsound');
            if (this.muted === false) {
                console.log('muting');
                music.muted = true;
                check.muted = true;
                flap.muted = true;
                hit.muted = true;
                this.muted = true;
            }
            else if (this.muted === true) {
                console.log('unmuting');
                music.muted = false;
                check.muted = false;
                flap.muted = false;
                hit.muted = false;
                this.muted = false;
            }
            
        }

        // Remember that this button is down.
        if (e.keyCode in KEYS) {
            var keyName = KEYS[e.keyCode];
            this.keys[keyName] = true;
            return false;
        }
    };

    Controls.prototype._onMouseDown = function() {
        this._didJump = true;
        
        // Remember that this button is down.
        if (0 in KEYS) {
            var keyName = KEYS[0];
            this.keys[keyName] = true;
            return false;
        }

    };

    Controls.prototype._onTapStart = function() {
        
        this._didJump = true;
        

        // Remember that this button is down.
        if (27 in KEYS) {
            var keyName = KEYS[27];
            this.keys[keyName] = true;
            return false;
        }
    };

    Controls.prototype._onTapEnd = function() {
        
        // Remember that this button is down.
        if (27 in KEYS) {
            var keyName = KEYS[27];
            this.keys[keyName] = false;
            return false;
        }

    };

    Controls.prototype._onMouseUp = function() {
        if (0 in KEYS) {
            var keyName = KEYS[0];
            this.keys[keyName] = false;
            return false;
        }
    };

    Controls.prototype._onKeyUp = function(e) {
        if (e.keyCode in KEYS) {
            var keyName = KEYS[e.keyCode];
            this.keys[keyName] = false;
            return false;
        }
    };

    /**
     * Only answers true once until a key is pressed again.
     */
    Controls.prototype.didJump = function() {
        var answer = this._didJump;
        this._didJump = false;
        return answer;
    };
    
    // Export singleton.
    return new Controls();
})();
