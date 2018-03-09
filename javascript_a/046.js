//this 指向

//1
function Animal(name) {
    this.name = name
}

Animal.prototype.speak = function() {
    return this
}

Animal.eat = function() {
    return this
}

let obj = new Animal('tiger')
let speak = obj.speak
speak()

let eat = Animal.eat
eat()

//2
class Animal {
    speak() {
        return this
    }
    static eat() {
        return this
    }
}

let obj = new Animal()
obj.speak()
let speak = obj.speak
speak()

Animal.eat()
let eat = Animal.eat
eat()