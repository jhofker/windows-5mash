(function () {
    'use strict';

    var shapes = [];

    function getRandomShape(x, y) {
        var strokeColor = Color.getRandomColor(),
            fillColor = Color.getRandomColor(),
            borderThickness = 8,
            strokeStyle = {
                thickness: borderThickness,
                caps: 'round',
                joint: 'round'
            },
            width = 160,
            height = 160,
            offsetX = width / 2,
            offsetY = height / 2,
            newX = x - offsetX,
            newY = y - offsetY,
            angle = Utils.getRandomNumber(0, 90),
            shape = new createjs.Shape();

        shape.graphics.beginStroke(strokeColor);
        shape.graphics.setStrokeStyle(strokeStyle.thickness, strokeStyle.caps, strokeStyle.joint);
        shape.graphics.beginFill(fillColor);
        shape.snapToPixel = true;

        var shapeRandom = Utils.getRandomNumber(0, 5);

        switch (shapeRandom) {
            case 0: //triangle
                shape.graphics.drawPolyStar(0, 0, width / 2, 3, 0, angle);
                shape.x = x;
                shape.y = y;
                break;
            case 1: //5-point star
                shape.graphics.drawPolyStar(0, 0, width / 2, 5, 0.6, angle);
                shape.x = x;
                shape.y = y;
                break;
            case 2: //rounded rectangle
                shape.graphics.drawRoundRect(newX, newY, width, height, strokeStyle.thickness * 4);
                shape.x = x;
                shape.y = y;
                shape.regX = x;
                shape.regY = y;
                shape.rotation = angle;
                break;
            case 3: //circle
                // circles draw around a point, so use the original x and y here.
                shape.graphics.drawCircle(0, 0, width / 2);
                shape.x = x;
                shape.y = y;
                shape.rotation = angle;
                break;
            case 4: //rectangle
                shape.graphics.drawRect(newX, newY, width, height);
                shape.x = x;
                shape.y = y;
                shape.regX = x;
                shape.regY = y;
                shape.rotation = angle;
                break;
            case 5: //pentagon
                shape.graphics.drawPolyStar(0, 0, width / 2, 5, 0, angle);
                shape.x = x;
                shape.y = y;
            default:
                return shape;
        }
        shape.graphics.endFill();
        shape.graphics.endStroke();

        //var shadowRandom = Utils.getRandomNumber(0, 20);
        //shape.shadow = new createjs.Shadow('rgba(0,0,0,.5)',
        //    shadowRandom,
        //    shadowRandom,
        //    shadowRandom);

        return shape;
    }

    function removeShape(shape) {
        var stage = shape.stage;
        shape.off('mousedown');

        if (stage) {
            createjs.Tween.get(shape, { override: true })
            .to({ scaleX: 0, scaleY: 0 }, Shared.timings.fast, createjs.Ease.quadOut)
            .call(function () {
                stage.removeChild(this);
            });
        }
    }

    WinJS.Namespace.define('Shapes', {
        getRandomShape: getRandomShape,
        removeShape: removeShape,
    });
})();