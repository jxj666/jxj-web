function Event() {
    this.events = {};
}
Event.prototype.on = function(attr, callback) {
    if (this.events[attr]) {
        this.events[attr].push(callback);
    } else {
        this.events[attr] = [callback];
    }
}
Event.prototype.off = function(attr) {
    for (let key in this.events) {
        if (this.events.hasOwnProperty(key) && key === attr) {
            delete this.events[key];
        }
    }
}
Event.prototype.emit = function(attr, ...arg) {
    this.events[attr] && this.events[attr].forEach(function(item) {
        item(...arg);
    })
}


function Observer(data) {
    this.data = data;
    this.walk(data);
    this.watch = new Event();
}

let p = Observer.prototype;
p.$watch = function(attr, callback) {
    this.watch.on(attr, callback);
}

p.walk = function(obj) {
    let val;
    for (let key in obj) {

        if (obj.hasOwnProperty(key)) {
            val = obj[key];

            if (typeof val === 'object') {
                new Observer(val);
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
            console.log('你访问了' + key);
            return val
        },
        set: function(newVal) {

            if (typeof newVal === 'object') {
                new Observer(newVal);
            }
            _this.watch.emit(key, val, newVal);
            console.log(`你设置了 ${key}, 新的值为${newVal}`);
            val = newVal;

        }
    })
};