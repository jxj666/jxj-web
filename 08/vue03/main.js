function Vue(data) {
    this.data = data;
    this.walk(data);
    this.events = {};
    this.cancelBubble = true;
}


Vue.prototype.walk = function(data, path) {
    let val;
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            val = data[key];
            this.convert(data, key, val, path);
        }
    }
}
Vue.prototype.path = function(val, path) {
    if (!val || typeof val !== 'object') return;
    if (path) {
        path = path + '.';
    }
    this.walk(val, path);
}
Vue.prototype.convert = function(obj, key, val, path) {
    if (!path) {
        path = key;
    } else {
        path = path + key;
    }
    this.path(val, path);

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
                self.path(val, path);
            }
        }
    });
}


Vue.prototype.$watch = function(attr, callback, cancelBubble) {
    if (typeof callback !== 'function') {
        console.log('应该使用函数作为回调');
        return;
    }
    if (this.events[attr]) {
        this.events[attr].push(callback);
    } else {
        this.events[attr] = [];
        this.events[attr].push(callback);
    }
    this.cancelBubble = cancelBubble || false;
}
Vue.prototype.$notify = function(path) {
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
        const fns = this.events[path];
        if (fns && fns.length) {
            fns.forEach(fn => fn && fn(this.$getValue(path)));
        }
    });
}
Vue.prototype.$getValue = function(exp) {
    const path = exp.split('.');
    let val = this.data;
    path.forEach(k => val = val[k]);
    return val;
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