// extends
class Animal {
    constructor(name) {
        this.name = name;
    }
    speak() {
        console.log(this.name)
    }
}

class Dog extends Animal {
    speak() {
        super.speak()
    }
}

var dog1 = new Dog('tugo')
dog1.speak()

