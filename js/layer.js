window.app = window.app || { };

app.Layer = function() {
    var elementId;
    var canvas;

    function initialize(id) {
        elementId = id;
        canvas = document.getElementById(elementId).getContext('2d');
    }

    function beginPath() {
        canvas.beginPath();
        canvas.imageSmoothingEnabled = false;
    }

    function closePath() {
        canvas.closePath();
    }

    function drawCoordinate(x, y) {
        canvas.lineTo(x,y);
        canvas.moveTo(x,y);
        canvas.stroke();
    }

    function drawImage(img,x,y,w,h) {
        canvas.drawImage(img, x, y, w, h);
    }

    function draw(context) {
        let cursor = context.getCursor();
        drawCoordinate(cursor.x,cursor.y);
        cursor.time = Date.now();
    }

    function getId() {
        return elementId;
    }

    function clear() {
        let element = document.getElementById(elementId);
        canvas.clearRect(0, 0, element.width, element.height);
    }

    function getDataURL() {
        return document.getElementById(elementId).toDataURL();
    }
   
    return {
        initialize,
        beginPath,
        closePath,
        draw,
        getId,
        clear,
        getDataURL,
        drawImage
    }
};
