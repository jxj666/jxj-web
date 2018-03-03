function device_type() {
    var ua = navigator.userAgent
    var agent = ['Android', 'iPhone'];
    for (var i = 0; i < agent.length; i++) {
        if (ua.indexOf(agent[i] )> 0) {
            return `符合运行条件!`
        }
    }
    return `不符合运行条件1`
}
device_type()