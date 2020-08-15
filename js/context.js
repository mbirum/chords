window.app = window.app || { };

app.Context = function(c, t) {
    var cursor = c;
    var timeline = t;


    function getCursor() {
        return cursor;
    }

    function getTimeline() {
        return timeline;
    }

    return {
        getCursor,
        getTimeline
    }
};