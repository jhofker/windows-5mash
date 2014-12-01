(function () {
    'use strict';

    function getRandomNumber(min, max) {
        var randInt = (Math.floor(Math.random() * (max - min + 1)) + min);
        return randInt;
    }

    WinJS.Namespace.define('Utils', {
        getRandomNumber: getRandomNumber,
    });
})();