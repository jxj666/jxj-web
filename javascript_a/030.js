//组合继承

function first(name) {
    this.name = name
    this.has = [1, 2, 3]
}
first.prototype.sayName = function() {
    alert(this.name)
}

function second(name, size) {
    first.call(this, name)
    this.size = size
}
second.prototype = new first()
second.prototype.saySzie = function() {
    alert(this.size)
}
if (global) global.alert = console.log

let a = new second('a', 5)
a.has.push(4)
alert(a.has)
a.sayName()
a.saySzie()

let b = new second('b', 6)
b.has.push(5)
alert(b.has)
b.sayName()
b.saySzie()