window.app = window.app || { };

app.Context = function(c) {
    var cursor = c;

    function getCursor() {
        return cursor;
    }

    return {
        getCursor
    }
};