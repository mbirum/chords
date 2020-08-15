window.app = window.app || { };

app.Layer = function() {
    var elementId;
    var canvas;

    var replays = new Map([]);

    var lastValuePushed = null;

    function initialize(id) {
        elementId = id;
        canvas = document.getElementById(elementId).getContext('2d');
    }

    function beginPath(context) {
        let key = context.getTimeline().getValue();
        if (!replays.has(key)) {
            replays.set(key, []);
        }
        let points = replays.get(key);
        if ('begin' != lastValuePushed) {
            replays.get(key).push('begin');
            lastValuePushed = 'begin';
        }
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

    function draw(context) {
        let cursor = context.getCursor();
        drawCoordinate(cursor.x,cursor.y);
        let key = context.getTimeline().getValue();
        if (!replays.has(key)) {
            replays.set(key, []);
        }
        cursor.time = Date.now();
        replays.get(key).push(cursor);
        lastValuePushed = cursor;
    }

    function getId() {
        return elementId;
    }

    function clear() {
        let element = document.getElementById(elementId);
        canvas.clearRect(0, 0, element.width, element.height);
    }

    function clearReplays() {
        replays = new Map([]);
    }

    function replay(timelineValue) {
        if (replays.has(timelineValue)) {
            let points = replays.get(timelineValue);
            if (points.length > 0) {
                for (let i = 0; i < points.length; i++) {
                    let point = points[i];
                    if ('begin' == point) {
                        canvas.beginPath();
                    }
                    else if (point.time < (Date.now() - 1000)) {
                        drawCoordinate(point.x, point.y);
                    }
                }
            }
        }
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
        clearReplays,
        replay,
        getDataURL
    }
};
