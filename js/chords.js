window.app = window.app || { };

var isDrawing = false;

var layers = [];
var activeLayer;

function load() {
    let loader = new app.ScriptLoader;

    loader.load('js/elements.js');
    loader.load('js/context.js');

    loader.load('js/layer.js', function() {
        events();
        createNewLayer();
        activeLayer.drawImage(document.getElementById("guitar"), 0, 0, 1400, 700);
    });
}

function createNewLayer() {
    layers.push(new app.Layer);

    $('#layers').children('.layer').each(function() {
        $(this).css('z-index', '-1');
    });

    let id = `layer${layers.length}`;
    let html = getLayerHTML(layers.length);
    $('#layers').append(html);

    layers[layers.length-1].initialize(id);
    activeLayer = layers[layers.length-1];
    $('#layer-label').html(layers.length);

    let layerItemHTML = getLayerItemHTML(layers.length);
    $('#layer-list').append(layerItemHTML);

    setLayerSize(document.getElementById(id));
}

function getPosition(layer, evt) {
    let rect = layer.getBoundingClientRect(), 
        scaleX = layer.width / rect.width,    
        scaleY = layer.height / rect.height;  
    return {
    x: (evt.clientX - rect.left) * scaleX,   
    y: (evt.clientY - rect.top) * scaleY     
    }
}

function isActiveLayer(layer) {
    return activeLayer.getId() === layer.id;
}

function buildContext() {
    return buildContext(null);
}

function buildContext(cursor) {
    return new app.Context(cursor);
}

function layerEvents() {
    $(document).on('mouseenter', '.layer', function (e) {
        activeLayer.beginPath(buildContext());
    });

    $(document).on('mouseup', '.layer', function (e) {
        activeLayer.beginPath(buildContext());
    });

    $(document).on('mouseleave', '.layer', function (e) {
        activeLayer.closePath();
    });
}


function events() {
    layerEvents();

    $(document).mousedown(function(e) {
        isDrawing = true;
    });

    $(document).mouseup(function(e) {
        isDrawing = false;
    });

    $(document).mousemove(function(e) {
        if (isDrawing && isActiveLayer(e.target)) {
            let context = buildContext(getPosition(e.target, e));
            activeLayer.draw(context);
        }
    });

    $(window).resize(function () {
        setSliderSize($('#slider'));
    });
}

$(document).ready(function(e) {
    load();
});