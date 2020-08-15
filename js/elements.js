function getLayerHTML(increment) {
    let id = `layer${increment}`;
    return `<canvas id="${id}" class="canvas layer col-xs-12" style="z-index: 1";></canvas>`;
}

function getLayerItemHTML(increment) {
    let iconId = `icon${increment}`;
    let iconHTML = `<img id="${iconId}" class="icon" src="lib/white.jpg" alt="">`;

    let layerItemId = `layer-item${increment}`;
    let label = increment;
    return `<li id="${layerItemId}" class="layer-item"><span>${label}</span>${iconHTML}</li>`;
}

function setLayerSize(layer) {
    let toolbar = $('#toolbar');
    let toolbarBottom = toolbar.position().top + toolbar.outerHeight(true);
    layer.width = 1400;
    layer.height = 700;
    layer.top = toolbarBottom;
    layer.left = toolbar.position().left;
    $(layer).width('50%');

    let iconId = 'icon' + layers.length;
    let icon = document.getElementById(iconId);
    icon.width = 1400;
    icon.height = 700;
    icon.top = 10;
    icon.left = $(icon).parent().position().left + 45;
    $(icon).width('250');
    $(icon).height('170');
}

function setSliderSize(slider) {
    let canvas = $('.layer').first();
    let handle = $('#slider-handle');
    $(slider).width(canvas.width() - handle.width() - 20);
}