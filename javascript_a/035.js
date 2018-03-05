//强制音频自动播放
$(window).one('touchstart', function() {
    music.play();
})

document.addEventListener('WeixinJSBridgeReady', function() {
    music.play();
}, false)