// 最大值与最小值之差
function MaxMinPlus(arr) {
    // 返回最大值与最小值之差
    return Array.isArray(arr) ? Math.max.apply(Math, arr) - Math.min.apply(Math, arr) : console.log('传入的不是数组亦或者未能解决的错误')
}


function MaxReduceMin(arr) {
    return Math.max.apply({}, arr) - Math.min.apply({}, arr);
}