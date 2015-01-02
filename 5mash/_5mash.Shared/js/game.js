(function () {
    'use strict';
    var canvas, context, stage,
        preload,
        timings = {
            fast: 250,
            moderate: 500,
            slow: 1000,
            short: 2000,
            medium: 4000,
            long: 8000,
        }
    ;

    function initialize() {
        canvas = document.getElementById('gameCanvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        context = canvas.getContext('2d');
        stage = new createjs.Stage(canvas);

        createjs.Touch.enable(stage);

        createjs.Ticker.timingMode = createjs.Ticker.RAF;
        createjs.Ticker.addEventListener('tick', stage);

        loadAssets();
    }

    function loadAssets() {
        preload = new createjs.LoadQueue();
        preload.installPlugin(createjs.Sound);

        preload.onComplete = prepareGame;
        preload.installPlugin(createjs.Sound);

        var images = [
            { id: 'orange-butterfly' },
            { id: 'orange-flower' },
            { id: 'white-butterfly' },
            { id: 'purple-flower' },
            { id: 'white-flower' },
            { id: 'yellow-flower' },
        ];

        for (var i in images) {
            i.src = '/images/nora-blanket/' + i.id + '.svg';
        }

        var manifest = [
        ];

        //preload.loadManifest(manifest);
        if (!WinJS.Utilities.isPhone) {
            Sounds.load();
        }
        prepareGame();
    }

    function prepareGame() {
        var background = new createjs.Shape();
        background.graphics.beginFill(Color.getRandomColor());
        background.graphics.drawRect(0, 0, window.innerWidth, window.innerHeight);

        background.on('mousedown', _handleCanvasTap);

        stage.addChild(background);
    }

    function _handleCanvasTap(e) {
        var shape = Shape.getRandomShape(e.stageX, e.stageY);

        setTimeout(function () {
            removeShape(shape);
        }, timings.long);

        shape.on('mousedown', _handleShapeTap);

        stage.addChild(shape);
        Sounds.playRandomSound();

        var t = createjs.Tween.get(shape)
            // animate in
            .to({ scaleX: 1.4, scaleY: 1.4 }, timings.short, createjs.Ease.backInOut)
            // "breathe" while alive.
            .to({ scaleX: 1.3, scaleY: 1.3 }, timings.long - timings.short, createjs.Ease.backInOut);
    }

    function _handleShapeTap(e) {
        removeShape(this);
    }

    function removeShape(shape) {
        shape.off('mousedown');

        createjs.Tween.get(shape, { override: true })
        .to({ scaleX: 0, scaleY: 0 }, timings.fast, createjs.Ease.quadOut)
        .call(function () {
            stage.removeChild(this);
        });
    }

    WinJS.Namespace.define('Game', {
        initialize: initialize,
    });
})();