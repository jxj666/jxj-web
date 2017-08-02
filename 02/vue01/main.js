//vue01

function Vue(data) {
    this.data = data;
    this.walk(data)
}

let p = Vue.prototype;

p.walk = function(obj) {
    let val;
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            val = obj[key];
            if (typeof val === 'object') {
                new Vue(val);
            }
            this.convert(key, val);
        }
    }
};

p.convert = function(key, val) {
    Object.defineProperty(this.data, key, {
        enumerable: true,
        configurable: true,
        get: function() {
            alert('你访问了' + key);
            return val
        },
        set: function(newVal) {
            alert('你设置了' + key + ',新的值为' + newVal);
            if (newVal === val) return;
            val = newVal
        }
    })
};

let app1 = new Vue({
    name: 'youngwind',
    age: 25
});

let app2 = new Vue({
    university: 'bupt',
    major: 'computer'
});

//dom绑定
button.onclick = function() {
    eval(input.value);
    input.value='';
}