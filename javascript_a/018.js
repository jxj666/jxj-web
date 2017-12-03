// unicode 解码编码
// charCodeAt unescape
// utf-8 usc-2 utf-16

function to_unicode(str) {
    var res = [];
    for (var i = 0; i < str.length; i++) {
        res[i] = ('00' + str.charCodeAt(i).toString(16)).slice(-4);
    }
    return '\\u' + res.join('\\u');
}

function unicode_to(str) {
    str.str.replace(/\\/g, '%');
    return unescape(str);
}