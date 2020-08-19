window.app = window.app || { };

app.Chords = function() {
    
    var json = {
        chords: [
            {"name":"Am","tags":["Minor","Key of A"],"notes":[{"x":347.3333333333333,"y":1372},{"x":584,"y":1404},{"x":616,"y":1390.5}]}
        ]
    };

    function getJSON() {
        return json;
    }

    return {
        getJSON
    }
};