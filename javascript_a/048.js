class A {
    constructor(x) {
        this.name = x
    }
    static self() {
        return this
    }
    info() {
        console.log(this)
    }
}
class B extends A {
    info() {
        super.info()
        console.log(this)
    }
}
let b = new B()
b.info()
A.self()