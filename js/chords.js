window.app = window.app || { };

app.Chords = function() {
    
    var json = {
        chords: [
            {
                name: 'A#m',
                tags: [
                    'key of A',
                    'power chord',
                    'minor'
                ]
            },
            {
                name: 'Bmaj',
                tags: [
                    'key of Bb',
                    'major'
                ]
            }
        ]
    };

    function getJSON() {
        return json;
    }

    return {
        getJSON
    }
};