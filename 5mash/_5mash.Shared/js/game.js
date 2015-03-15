(function () {
    'use strict';
    var canvas, context, stage,
        preload,        
        maxDimension
    ;

    function initialize() {
        maxDimension = Math.max(window.innerWidth, window.innerHeight);

        canvas = document.getElementById('gameCanvas');
        canvas.width = maxDimension;
        canvas.height = maxDimension;

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
        background.graphics.drawRect(0, 0, maxDimension, maxDimension);

        background.on('mousedown', _handleCanvasTap);

        stage.addChild(background);
    }

    function _handleCanvasTap(e) {
        var shape = Shapes.getRandomShape(e.stageX, e.stageY);

        setTimeout(function () {
            Shapes.removeShape(shape);
        }, Shared.timings.long);

        shape.on('mousedown', _handleShapeTap);

        stage.addChild(shape);
        Sounds.playRandomSound();

        var t = createjs.Tween.get(shape)
            // animate in
            .to({ scaleX: 1.4, scaleY: 1.4 }, Shared.timings.short, createjs.Ease.backInOut)
            // "breathe" while alive.
            .to({ scaleX: 1.3, scaleY: 1.3 }, Shared.timings.long - Shared.timings.short, createjs.Ease.backInOut);
    }

    function _handleShapeTap(e) {
        Shapes.removeShape(this);
    }

    WinJS.Namespace.define('Game', {
        initialize: initialize,
    });
})();