(function () {
    'use strict';       

    function getRandomShape(x, y) {
        var strokeColor = Color.getRandomColor(),
            fillColor = Color.getRandomColor(),
            borderThickness = 8,
            strokeStyle = { thickness: borderThickness },
            width = 140,
            height = 140,
            offsetX = width / 2,
            offsetY = height / 2,
            newX = x - offsetX,
            newY = y - offsetY,
            shape = new createjs.Shape();

        shape.graphics.beginStroke(strokeColor);
        shape.graphics.setStrokeStyle(strokeStyle.thickness);
        shape.graphics.beginFill(fillColor);
        shape.snapToPixel = true;

        var shapeRandom = Math.floor(Math.random() * 3);

        switch (shapeRandom) {
            case 'triangle':
                break;
            case 'star':
                break;
            case 0:
                shape.graphics.drawRoundRect(0, 0, width, height, strokeStyle.thickness * 4);
                shape.x = newX;
                shape.y = newY;
                break;
            case 1:
                // circles draw around a point, so use the original x and y here.
                shape.graphics.drawCircle(0, 0, width / 2);
                shape.x = x;
                shape.y = y;
                break;
            case 2:
            default:
                shape.graphics.drawRect(0, 0, width, height);
                shape.x = newX;
                shape.y = newY;
                break;
        }

        return shape;
    }

    WinJS.Namespace.define('Shape', {
        getRandomShape: getRandomShape,
    });
})();