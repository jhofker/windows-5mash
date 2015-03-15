(function () {
    'use strict';

    var timings = {
        fast: 250,
        moderate: 500,
        slow: 1000,
        short: 2000,
        medium: 4000,
        long: 8000,
    };

    WinJS.Namespace.define('Shared', {
        timings: timings,
    });
})();