//组合继承

function first(name) {
    this.name = name
    this.has = [1, 2, 3]
}
first.prototype.sayName = function() {
    console.log(this.name)
}

function second(name, size) {
    first.call(this, name)
    this.size = size
}
second.prototype = new first()
second.prototype.saySzie = function() {
    console.log(this.size)
}

let a1 = new second('a', 5)
a1.has.push(4)
console.log(a1.has)
a1.sayName()
a1.saySzie()

let b1 = new second('b', 6)
b1.has.push(5)
console.log(b1.has)
b1.sayName()
b1.saySzie()