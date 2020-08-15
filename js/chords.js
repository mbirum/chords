window.app = window.app || { };

var isDrawing = false;

var layers = [];
var activeLayer;
var barres = [];
var isBarring = false;
var barreFromTo = {
    from: null,
    to: null
};

function load() {
    let loader = new app.ScriptLoader;

    loader.load('js/elements.js');
    loader.load('js/context.js');
    loader.load('js/note.js');
    loader.load('js/barre.js');

    loader.load('js/layer.js', function() {
        events();
        createNewLayer();
        activeLayer.drawImage(document.getElementById("guitar"), 0, 0, 4000, 2000);
        //drawCoreNotes();
    });
}

function drawCoreNotes() {
    let f1 = new app.Barre(113,488);
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
    let rwidth = Math.floor(rect.width);
    let rheight = Math.floor(rect.height);
    let rleft = Math.floor(rect.left);
    let rtop = Math.floor(rect.top);
    // console.log(`layer.width: ${layer.width}`);
    // console.log(`layer.height: ${layer.height}`);
    // console.log(`rect.width: ${rwidth}`);
    // console.log(`rect.height: ${rheight}`);
    // console.log(`rect.left: ${rleft}`);
    // console.log(`rect.top: ${rtop}`);
    // console.log(`clientX,Y: ${evt.clientX}, ${evt.clientY}`);
    // console.log(`scaledX,Y: ${Math.floor((evt.clientX - rect.left) * scaleX) - 16}, ${Math.floor((evt.clientY - rect.top) * scaleY)}`);
    // console.log(``);
    return {
        x: Math.floor((evt.clientX - rect.left) * scaleX),   
        y: Math.floor((evt.clientY - rect.top) * scaleY)
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
    $(document).on('mousemove', '.layer', function(e) {
        getPosition(e.target, e);
    });
}


function events() {
    layerEvents();

    $(document).keydown(function(e) {
        if (e.keyCode == 66) {
            isBarring = true;
        }
    }).keyup(function() {
        isBarring = false;
    });

    $(document).mouseup(function(e) {
        if (isBarring) {
            if (null == barreFromTo.from && null == barreFromTo.to) {
                barreFromTo.from = getPosition(e.target, e);
            }
            else if (null == barreFromTo.to) {
                barreFromTo.to = getPosition(e.target, e);
                activeLayer.drawLine(barreFromTo.from, barreFromTo.to);
                activeLayer.closePath();
                barreFromTo.from = null;
                barreFromTo.to = null;
            }
        }
    });
}

$(document).ready(function(e) {
    load();
});