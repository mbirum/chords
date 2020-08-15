window.app = window.app || { };

var isDrawing = false;

var layers = [];
var activeLayer;
var barres = [];

function load() {
    let loader = new app.ScriptLoader;

    loader.load('js/elements.js');
    loader.load('js/context.js');
    loader.load('js/note.js');
    loader.load('js/barre.js');

    loader.load('js/layer.js', function() {
        events();
        createNewLayer();
        activeLayer.drawImage(document.getElementById("guitar"), 0, 0, 1400, 700);
        drawCoreNotes();
    });
}

function drawCoreNotes() {
    let f1 = new app.Barre(115,488);
    f1.addNote(new app.Note(0,0,'white'));
    barres.push(f1);

    let f2 = new app.Barre(220,492);
    f2.addNote(new app.Note(0,0,'white'));
    barres.push(f2);

    let f3 = new app.Barre(322,494);
    f3.addNote(new app.Note(0,0,'white'));
    barres.push(f3);
    
    let f4 = new app.Barre(420,497);
    f4.addNote(new app.Note(0,0,'white'));
    barres.push(f4);
    
    let f5 = new app.Barre(518,498);
    f5.addNote(new app.Note(0,0,'white'));
    barres.push(f5);
    
    let f6 = new app.Barre(610,501);
    f6.addNote(new app.Note(0,0,'white'));
    barres.push(f6);
    
    let f7 = new app.Barre(700,502);
    f7.addNote(new app.Note(0,0,'white'));
    barres.push(f7);
    
    let f8 = new app.Barre(788,503);
    f8.addNote(new app.Note(0,0,'white'));
    barres.push(f8);
    
    let f9 = new app.Barre(872,504);
    f9.addNote(new app.Note(0,0,'white'));
    barres.push(f9);
    
    let f10 = new app.Barre(952,506);
    f10.addNote(new app.Note(0,0,'white'));
    barres.push(f10);
    
    let f11 = new app.Barre(1028,507);
    f11.addNote(new app.Note(0,0,'white'));
    barres.push(f11);
    
    let f12 = new app.Barre(1102,509);
    f12.addNote(new app.Note(0,0,'white'));
    barres.push(f12);
    
    let f13 = new app.Barre(1173,510);
    f13.addNote(new app.Note(0,0,'white'));
    barres.push(f13);
    
    let f14 = new app.Barre(1240,511);
    f14.addNote(new app.Note(0,0,'white'));
    barres.push(f14);
    
    let f15 = new app.Barre(1304,512);
    f15.addNote(new app.Note(0,0,'white'));
    barres.push(f15);
    
    let f16 = new app.Barre(1367,513);
    f16.addNote(new app.Note(0,0,'white'));
    barres.push(f16);
    
    barres.forEach(function(barre) {
        activeLayer.drawBarre(barre);
    })
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