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

    function drawBarre(barre) {
        let core = barre.getCoreNote();
        let notes = barre.getNotes();
        for (let i = 0; i < notes.length; i++) {
            let x = core.x + notes[i].getXOffset();
            let y = core.y + notes[i].getYOffset();
            let fill = notes[i].getFill();
            drawCircle(x, y, fill);
        }
    }

    function drawCircle(x, y, style) {
        canvas.beginPath();
        canvas.arc(x, y, 3, 0, 2 * Math.PI, false);
        canvas.fillStyle = style;
        canvas.fill();
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
        drawCircle,
        getId,
        clear,
        getDataURL,
        drawImage,
        drawBarre
    }
};
