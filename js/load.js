window.app = window.app || { };

app.ScriptLoader = function() {
    function load(name, callback) {
        var head = document.head;
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = name;
        script.onload = callback;
        head.appendChild(script);
    }

    return {
        load
    }
};