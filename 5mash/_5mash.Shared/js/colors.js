(function () {
    'use strict';

    function getRandomColor() {
        var letters = '456789ABCD'.split(''),
            color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 10)];
        }
        return color;
    }

    WinJS.Namespace.define('Color', {
        getRandomColor: getRandomColor,
    });
})();