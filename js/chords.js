window.app = window.app || { };

var isDrawing = false, isSliding = false;

var layers = [];
var activeLayer;

var timeline;

function load() {
    let loader = new app.ScriptLoader;

    loader.load('js/elements.js');
    loader.load('js/context.js');

    loader.load('js/timeline.js', function() {
        timeline = new app.Timeline;
    });

    loader.load('js/layer.js', function() {
        events();
        createNewLayer();
        setSliderSize($('#slider'));
    });
}

function forEachLayer(block) {
    for (let i = 0; i < layers.length; i++) {
        block(layers[i]);
    }
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

function copyToIcon() {
    let increment = activeLayer.getId().replace('layer', '');
    let iconId = `icon${increment}`;
    $(`#${iconId}`).attr('src', activeLayer.getDataURL());
}

function isActiveLayer(layer) {
    return activeLayer.getId() === layer.id;
}

function buildContext() {
    return buildContext(null);
}

function buildContext(cursor) {
    return new app.Context(cursor, timeline);
}

function runTimeline() {
    $('#slider').slider('value', timeline.getValue() + 10);

    if (timeline.getValue() >= timeline.getMax()) {
        $('#slider').slider('value', 0);
    }
}

function toolbarEvents() {
    $(document).on('click', '.btn-play', function (e) {
        if ($(this).hasClass('state-play')) {
            if (!timeline.isRunning()) {
                timeline.start(runTimeline);
                $('#slider').slider('disable');
                $(this).removeClass('state-play');
                $(this).addClass('state-stop');
                $(this).html('Stop');
            }
        }
        else {
            timeline.stop();
            $('#slider').slider('enable');
            $(this).removeClass('state-stop');
            $(this).addClass('state-play');
            $(this).html('Play');
        }
    });

    $(document).on('click', '.btn-reset', function (e) {
        $('#slider').slider('value', 0);
    });

    $(document).on('click', '.btn-clear', function (e) {
        activeLayer.clear();
        activeLayer.clearReplays();
        copyToIcon();
    });

    $(document).on('click', '.btn-save', function (e) {
        createNewLayer();
    });

    $(document).on('click', '.btn-start-over', function (e) {
        document.location.reload();
    });
}

function sliderEvents() {
    var handle = $( "#slider-handle" );
    var onChange = function(event, ui) {
        handle.text(Math.floor((ui.value / 100) / timeline.getSpeedFactor()));
        
        forEachLayer(function(layer) {
            if (timeline.getMin() == timeline.getValue()) {
                layer.clear();
            }

            if (!timeline.isRunning()) {
                layer.clear();
                let redrawPoints = timeline.getValuesUpTo(ui.value);
                for (let i = 0; i < redrawPoints.length; i++) {
                    layer.replay(redrawPoints[i]);
                }
            }
            else {
                layer.replay(timeline.getValue());
            }
        });

        timeline.setValue(ui.value);
    };

    $( "#slider" ).slider({
        create: function() {
            let value = $(this).slider('value');
            handle.text( value/100 );
        },
        slide: onChange,
        change: onChange,
        min: 0,
        max: 6000,
        step: 10
    });
}

function speedEvents() {
    $("#btn-speed-half").click(function() {
        timeline.setSpeed(timeline.HALF_X);
    });
    $("#btn-speed-one").click(function() {
        timeline.setSpeed(timeline.ONE_X);
    });
    $("#btn-speed-two").click(function() {
        timeline.setSpeed(timeline.TWO_X);
    });
    $("#btn-speed-four").click(function() {
        timeline.setSpeed(timeline.FOUR_X);
    });
    $(".btn-speed").click(function() {
        $("#slider-handle").text(Math.floor((timeline.getValue() / 100) / timeline.getSpeedFactor()));
    });
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

function sidebarEvents() {
    $(document).on('click', '.layer-item', function (e) {
        e.stopPropagation();
        $('#layers').children('.layer').each(function () {
            $(this).css('z-index', '-1');
        });
        let increment = $(this).children('span').first().html();
        let id = `#layer${increment}`;
        $(id).css('z-index', '1');
        activeLayer = layers[increment - 1];
        $('#layer-label').html(increment);
        $('#sidebar').removeClass('active');
    });

    $('#sidebar').mouseenter(function (e) {
        if (!isDrawing && !isSliding) {
            $(this).addClass('active');
        }
    });
}

function events() {
    toolbarEvents();
    sliderEvents();
    speedEvents();
    layerEvents();
    sidebarEvents();
    
    $(document).mousedown(function(e) {
        if ('slider-handle' == e.target.id) {
            isSliding = true;
            if (timeline.isRunning()) {
                $('.btn-play').click();
            }
            return;
        }
        if (e.target.id != 'sidebar') {
            if ($(e.target).closest("#sidebar").length == 0) {
                $('#sidebar').removeClass('active');
            }
        }
        isDrawing = true;
    });

    $(document).mouseup(function(e) {
        copyToIcon();
        isDrawing = false;
        isSliding = false;
    });

    $(document).mousemove(function(e) {
        if (isSliding) {
            return;
        }
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