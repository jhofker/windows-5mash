(function () {
    'use strict';

    var Sound = createjs.Sound,
        sounds;

    function load() {
        if (!createjs.Sound.initializeDefaultPlugins()) {
            return;
        }

        var assetsPath = '/sounds/';
        sounds = [
            { src: 'electronic_click_01.mp3', id: '0' },
            { src: 'electronic_click_02.mp3', id: '1' },
            { src: 'electronic_click_03.mp3', id: '2' },
            { src: 'electronic_click_04.mp3', id: '3' },
            { src: 'electronic_click_05.mp3', id: '4' },
            { src: 'electronic_click_06.mp3', id: '5' },
        ];

        //Sound.addEventListener('fileload', createjs.proxy(soundLoaded, this)); // add an event listener for when load is completed
        var loaded = Sound.registerSounds(sounds, assetsPath);
    }

    function playSound(soundId) {
        //Play the sound: play (src, interrupt, delay, offset, loop, volume, pan)
        var instance = Sound.play(soundId, Sound.INTERRUPT_LATE, 0, 0, false, 1);
        if (instance == null || instance.playState == Sound.PLAY_FAILED) {
            throw 'Error playing sound';

        }
    }

    function getRandomSound() {
        var id = Math.floor(Math.random() * 6);

        return id.toString();
    }

    function playRandomSound() {
        var soundId = getRandomSound();
        playSound(soundId);
    }

    WinJS.Namespace.define('Sounds', {
        load: load,
        playRandomSound: playRandomSound,
    });
})();