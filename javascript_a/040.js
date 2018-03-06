// 脏数据监测
//数据记录
Scope.prototype.watch = function(watchExp, callback) {
    this.watchers.push({
        watchExp: watchExp,
        callback: callback || function() {}
    })
}
//脏值监测
Scope.prototype.digest = function() {
    var dirty;
    do {
        dirty = false;
        for (var i = 0; i < this.watchers.length; i++) {
            var newval = this.watchers[i].watchExp(),
                oldVal = this.watchers[i].last;
            if (newval !== oldVal) {
                this.watchers[i].callback(newVal, oldVal);
                dirty = true;
                this.watchers[i].last = newVal;
            }
        }
    } while (dirty);
}