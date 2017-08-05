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
    this.cancelBubble = true;
}
var v_father = Vue.prototype;
v_father.walk = function(data, path) {
    let val;
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            val = data[key];
            this.convert(data, key, val, path);
        }
    }
}
v_father.convert = function(obj, key, val, path) {
    if (!path) {
        path = key;
    } else {
        path = path + key;
    }
    this.new_path(val, path);

    let self = this;
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function() {
            return val;
        },
        set: function(newVal) {
            if (newVal === val) return;
            val = newVal;
            if (!self.cancelBubble) {
                self.$notify(path || key);
            }
            if (typeof val === 'object') {
                self.new_path(val, path);
            }
        }
    });
}
v_father.new_path = function(val, path) {
    if (!val || typeof val !== 'object') return;
    if (path) {
        path = path + '.';
    }
    this.walk(val, path);
}

v_father.$notify = function(path) {
    const keys = path.split('.');
    const paths = keys.map((key, index) => {
        if (index === 0) {
            return key;
        } else {
            let str = '';
            while (index--) str = keys[index] + '.' + str;
            return str + key;
        }
    });
    paths.forEach((path) => {
        this.watch.trigger(path);
    });
}

v_father.$watch = function(attr, callback, cancelBubble) {
    if (typeof callback !== 'function') {
        console.log('应该使用函数作为回调');
        return;
    }
    this.watch.on(attr, callback);
    this.cancelBubble = cancelBubble || false;
}

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