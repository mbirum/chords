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
    layer.width = 4000;
    layer.height = 2000;
    layer.top = 0;
    layer.left = 0;
    $(layer).width('97%');
}

function setSliderSize(slider) {

}