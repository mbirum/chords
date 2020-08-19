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

    function drawImage(img,x,y,w,h) {
        canvas.drawImage(img, x, y, w, h);
    }

    function drawLine(from, to) {
        canvas.beginPath();
        canvas.moveTo(from.x, from.y);
        canvas.lineTo(to.x, to.y);
        canvas.lineWidth = 5;
        canvas.stroke();
    }

    function drawBarre(barre) {
        let notes = barre.getNotes();
        for (let i = 0; i < notes.length; i++) {
            drawCircle(notes[i].getX(), notes[i].getY(), notes[i].getRadius());
        }
    }

    function drawCircle(x, y, r, style = null) {
        canvas.beginPath();
        canvas.lineWidth = 2;
        canvas.strokeStyle = 'white';
        canvas.arc(x, y, r, 0, 2 * Math.PI, false);
        if (null != style) {
            canvas.fillStyle = style;
            canvas.fill();
        }
        canvas.stroke();
    }

    function drawText(text, x, y) {
        canvas.beginPath();
        canvas.fillStyle = "black";
        canvas.font = '280px Arial';
        canvas.fillText(text, x, y);
    }

    function toURL() {
        return document.getElementById(elementId).toDataURL('image/png');
    }
   
    return {
        initialize,
        beginPath,
        closePath,
        drawImage,
        drawLine,
        drawBarre,
        drawCircle,
        drawText,
        toURL
    }
};
