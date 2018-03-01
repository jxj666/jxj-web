function read_cid() {
    function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    var __a = readCookie('__a');
    if (__a) {
        var _parts = __a.split('.');
        return _parts[1] + _parts[0];
    }
    return "";
}

function get_sid() {
    var cid = read_cid();
    // weixin share
    return 'wxs-' + cid;
}