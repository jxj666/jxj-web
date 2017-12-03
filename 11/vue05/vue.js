function Vue(data) {
    this.data = data;
    this.dom(data);
    this.walk(data);
}

let p = Vue.prototype;

p.walk = function(data) {
    let val;
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            val = data[key];
            if (typeof val === 'object') {
                new Vue(val);
            }
            this.convert(key, val);
        }
    }
};

p.convert = function(key, val) {
	var dom_new=this.dom;
	var data_new=this.data; 
    Object.defineProperty(this.data, key, {
        enumerable: true,
        configurable: true,
        get: function() {
            alert('你访问了' + key);
            return val;
        },
        set: function(newVal) {
            alert('你设置了' + key + ',新的值为' + newVal);
            if (newVal === val) return;
            val = newVal;
            dom_new(data_new);
        }
    })
};

p.dom = function(data) {
	console.log(data);
    if (!data.el) return;
    var dom = document.querySelector(data.el);
    var html_old = dom.innerHTML;
    var html_new = html_old.replace(/{{(.*?)}}/g, function(word) {
        var arr = word.slice(2, -2).split('.');
        return data.data[arr[0]][arr[1]];
    });
    dom.innerHTML = html_new;
};
// app.data.data.user.name='jxj';