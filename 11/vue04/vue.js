function Vue(obj) {
    var el = obj.el;
    var data = obj.data;
    var dom = document.getElementById(el.slice(1));
    var html_old = dom.innerHTML;
    var html_new = html_old.replace(/{{(.*?)}}/g, function(word) {
        var arr = word.slice(2, -2).split('.');
        return data[arr[0]][arr[1]];
    });
    dom.innerHTML = html_new;
}