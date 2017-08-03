function Event() {
    this.events = {};
}
Event.prototype = {
    on: function(attr, callback) {
        if (this.events[attr]) {
            this.events[attr].push(callback);
        } else {
            this.events[attr] = [callback];
        }
    },

    off: function(attr) {
        for (let key in this.events) {
            if (this.events.hasOwnProperty(key) && key === attr) {
                delete this.events[key];
            }
        }
    },
    trigger: function(attr, ...arg) {
        this.events[attr] && this.events[attr].forEach(function(item) {
            item(...arg);
        })
    }
}





function Vue(data) {
    this.data = data;
    this.walk(data);
    this.watch = new Event();
}

let p = Vue.prototype;

p.$watch = function(attr, callback) {
    this.watch.on(attr, callback);
}

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
    let _this = this;
    Object.defineProperty(this.data, key, {
        enumerable: true,
        configurable: true,
        get: function() {
            alert('你访问了' + key);
            return val;
        },
        set: function(newVal) {

            if (typeof newVal === 'object') {
                new Vue(newVal);
            }
            _this.watch.trigger(key, val, newVal);
            alert(`你设置了 ${key}, 新的值为${newVal}`);
            val = newVal;

        }
    })
};





let app2 = new Vue({
    name: {
        firstName: 'shaofeng',
        lastName: 'liang'
    },
    age: 25
});





//dom绑定
button.onclick = function() {
    eval(input.value);
    input.value = '';
}