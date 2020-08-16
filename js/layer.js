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

    function drawLine(from, to) {
        canvas.beginPath();
        canvas.moveTo(from.x, from.y);
        canvas.lineTo(to.x, to.y);
        canvas.lineWidth = 5;
        canvas.stroke();
    }

    function drawBarre(barre) {
        canvas.lineWidth = 2;
        let from = barre.getFrom();
        let to = barre.getTo();

        let leftOffset = -12;
        let topOffset = -15;

        let xDiff = to.x - from.x;
        let increment = xDiff / 6;

        let relativeX = to.x - from.x;
        let relativeY = Math.abs(to.y - from.y);

        let k = relativeY / relativeX;

        for (let i = 0; i < 6; i++) {
            let x = (from.x + (i * increment));
            let newRelativeX = x - from.x;
            let newRelativeY = k * newRelativeX;
            let y = Math.abs(newRelativeY - from.y)
            drawCircle(x + leftOffset, y + topOffset);
        }
    }

    function drawCircle(x, y, style = null) {
        canvas.beginPath();
        canvas.arc(x, y, 12, 0, 2 * Math.PI, false);
        if (null != style) {
            canvas.fillStyle = style;
            canvas.fill();
        }
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
        drawLine,
        getId,
        clear,
        getDataURL,
        drawImage,
        drawBarre
    }
};
