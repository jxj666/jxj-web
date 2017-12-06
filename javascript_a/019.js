// rem 根 size 计算
function get_size(ratio) {
    document.documentElement.style.fontSize = document.documentElement.clientWidth / ratio + 'px';
}
function delay(method, context, ratio) {
    clearTimeout(method.time);
    method.time = setTimeout(function() {
        method.call(context, ratio);
    });
}
window.onresize = function() {
    delay(get_size, undefined, ratio);
}