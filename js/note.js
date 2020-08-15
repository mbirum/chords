window.app = window.app || { };

app.Note = function(xoff, yoff, f) {
    var fill = f;
    var xOffset = xoff;
    var yOffset = yoff;

    function getFill() {
        return fill;
    }

    function getXOffset() {
        return xOffset;
    }

    function getYOffset() {
        return yOffset;
    }

    return {
        getFill,
        getXOffset,
        getYOffset
    }
};