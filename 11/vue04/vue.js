function Vue(data) {
    var dom = document.querySelector(data.el);
    var html_old = dom.innerHTML;
    var html_new = html_old.replace(/{{(.*?)}}/g, function(word) {
        var arr = word.slice(2, -2).split('.');
        return data.data[arr[0]][arr[1]];
    });
    dom.innerHTML = html_new;
}