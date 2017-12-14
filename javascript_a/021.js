// 函数getCookies()解析document.cookie， 并返回一个对象， 该对象的属性名为cookie的name，属性值为cookie的value。请写出该函数的实现代码
//将cookie转换为js对象

function getCookie() {
    var cookie = {};
    var all = document.cookie;
    if (all) {
        var list = all.split('; ');
        for (var i = 0; i < list.length; i++) {
            var arr = list[i].split('=');
            var name = decodeURIComponent(arr[0]);
            var value = decodeURIComponent(arr[1]);
            cookie[name] = value;
        }
    }
    return cookie;
}