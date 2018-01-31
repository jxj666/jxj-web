// 函数fadeout(element)实现了元素的淡出效果（即透明度从1变到0），动画时间为10秒钟.用定时器setInterval实现动画，写出函数fadeout的实现代码

function fadeout(ele) {
    var stepLength = 1 / 100;
    if (!parseFloat(ele.style.opacity)) {
        ele.style.opacity = 1;
    }
    function step() {
        if (parseFloat(ele.style.opacity) - stepLength > 0) {
            ele.style.opacity = parseFloat(ele.style.opacity) - stepLength;
        } else {
            ele.style.opacity = 0;
            clearInterval(timer);
        }
    }
    var timer = setInterval(step, 100);
}