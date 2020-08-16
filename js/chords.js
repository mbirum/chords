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
    loader.load('js/note.js');
    loader.load('js/barre.js');
    loader.load('js/layer.js', function() {
        events();
        createNewLayer();
        activeLayer.drawImage(document.getElementById("guitar"), 0, 0, 4000, 2000);
        drawBarres();
    });
}

function drawBarres() {
    barres.push(new app.Barre({x:236,y:1439}, {x:421, y:1361}));
    barres.push(new app.Barre({x:532,y:1446}, {x:724, y:1365}));
    barres.push(new app.Barre({x:835,y:1450}, {x:990, y:1369}));
    barres.push(new app.Barre({x:1134,y:1457}, {x:1279, y:1383}));
    barres.push(new app.Barre({x:1415,y:1476}, {x:1541, y:1387}));
    barres.push(new app.Barre({x:1693,y:1479}, {x:1804, y:1383}));
    barres.push(new app.Barre({x:1959,y:1483}, {x:2051, y:1387}));
    barres.push(new app.Barre({x:2207,y:1490}, {x:2295, y:1391}));
    barres.push(new app.Barre({x:2465,y:1498}, {x:2521, y:1391}));
    barres.push(new app.Barre({x:2702,y:1498}, {x:2739, y:1402}));
    barres.push(new app.Barre({x:2931,y:1505}, {x:2953, y:1409}));
    barres.push(new app.Barre({x:3157,y:1516}, {x:3149, y:1402}));
    barres.push(new app.Barre({x:3364,y:1516}, {x:3341, y:1409}));
    barres.push(new app.Barre({x:3563,y:1527}, {x:3526, y:1416}));
    barres.push(new app.Barre({x:3763,y:1531}, {x:3696, y:1420}));
    barres.push(new app.Barre({x:3940,y:1531}, {x:3859, y:1413}));
    barres.forEach(function(b) {
        activeLayer.drawBarre(b);
    });
}

// function drawCoreNotes() {
    // let f1 = new app.Barre(113,488);
    // f1.addNote(new app.Note(0,0,'white'));
    // barres.push(f1);
// }

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
        x: Math.floor((evt.clientX - rect.left) * scaleX),   
        y: Math.floor((evt.clientY - rect.top) * scaleY)
    }
}

function isActiveLayer(layer) {
    return activeLayer.getId() === layer.id;
}

function layerEvents() {

    $(document).on('mousemove', '.layer', function(e) {
        // getPosition(e.target, e);
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
                let b = new app.Barre(barreFromTo.from, barreFromTo.to);
                barres.push(b);
                console.log(`New Barre! From ${barreFromTo.from.x},${barreFromTo.from.y}, {x:${barreFromTo.to.x}, ${barreFromTo.to.y}`);
                activeLayer.drawBarre(b);
                barreFromTo.from = null;
                barreFromTo.to = null;
            }
        }
    });
}

$(document).ready(function(e) {
    load();
});










