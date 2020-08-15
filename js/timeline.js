window.app = window.app || { };

app.Timeline = function() {
    var min = 0, max = 6000, value = 0;

    var block = null;
    var interval = null;

    var HALF_X = 100;
    var ONE_X = 50;
    var TWO_X = 25;
    var FOUR_X = 12;

    var speed = ONE_X;

    function getSpeedFactor() {
        if (speed == HALF_X) {
            return 1;
        }
        else if (speed == TWO_X) {
            return 4;
        }
        else if (speed == FOUR_X) {
            return 8;
        }
        else {
            return 2;
        }
    }

    function setSpeed(s) {
        speed = s;
        if (isRunning()) {
            stop();
            start(block);
        }
    }
    
    function setMin(m) {
        min = m;
    }

    function setMax(m) {
        max = m;
    }

    function setValue(v) {
        value = v;
    }

    function getMin() {
        return min;
    }

    function getMax() {
        return max;
    }

    function getValue() {
        return value;
    }

    function start(b) {
        block = b;
        interval = setInterval(block, speed);
    }

    function stop() {
        clearInterval(interval);
        interval = null;
    }

    function isRunning() {
        return null != interval;
    }

    function getValuesUpTo(target) {
        let values = [];
        for (let i = 0; i <= target; i += 10) {
            values.push(i);
        }
        return values;
    }

    return {
        getSpeedFactor,
        setSpeed,
        setMin,
        setMax,
        setValue,
        getMin,
        getMax,
        getValue,
        start,
        stop,
        isRunning,
        getValuesUpTo,
        HALF_X,
        ONE_X,
        TWO_X,
        FOUR_X
    }
        
};