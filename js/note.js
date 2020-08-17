window.app = window.app || { };

app.Note = function(xc, yc, f = null) {
    var fill = f;
    var x = xc;
    var y = yc;
    var radius = 12;
    var filled = false;

    function getFill() {
        return fill;
    }

    function getX() {
        return x;
    }

    function getY() {
        return y;
    }

    function setFilled() {
        filled = true;
    }

    function isFilled() {
        return filled;
    }

    function isTouched(cursor) {
        let isBetweenX = false;
        let isBetweenY = false;
        
        let isLessThanX = false;
        let isGreaterThanX = false;
        let isLessThanY = false;
        let isGreaterThanY = false;

        if (cursor.x >= (x-radius)) {
            isGreaterThanX = true;
        }
        if (cursor.x <= (x+radius)) {
            isLessThanX = true;
        }
        if (cursor.y >= (y-radius)) {
            isGreaterThanY = true;
        }
        if (cursor.y <= (y+radius)) {
            isLessThanY = true;
        }
        
        if (isLessThanX && isGreaterThanX) {
            isBetweenX = true;
        }
        if (isLessThanY && isGreaterThanY) {
            isBetweenY = true;
        }

        return isBetweenX && isBetweenY;
    }

    function getRadius() {
        return radius;
    }

    return {
        getFill,
        getX,
        getY,
        isTouched,
        getRadius,
        setFilled,
        isFilled
    }
};