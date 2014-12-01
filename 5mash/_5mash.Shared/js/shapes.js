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

        var shapeRandom = Math.floor(Math.random() * 5);

        switch (shapeRandom) {
            case 0: //triangle
                shape.graphics.drawPolyStar(0, 0, width / 2, 3, 0, 120);
                shape.x = x;
                shape.y = y;
                break;
            case 1: //5-point star
                shape.graphics.drawPolyStar(0, 0, width / 2, 5, 0.6, -90);
                shape.x = x;
                shape.y = y;
                break;
            case 2: //rounded rectangle
                shape.graphics.drawRoundRect(-width / 2, -height / 2, width, height, strokeStyle.thickness * 4);
                shape.x = newX;
                shape.y = newY;
                break;
            case 3: //circle
                // circles draw around a point, so use the original x and y here.
                shape.graphics.drawCircle(0, 0, width / 2);
                shape.x = x;
                shape.y = y;
                break;
            case 4: //rectangle
            default:
                shape.graphics.drawRect(-width / 2, -height / 2, width, height);
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