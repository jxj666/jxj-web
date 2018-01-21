function SuperType(name) {
    this.name = name;
    this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function() {
    alert(this.name);
}
function SubType(name, age) {
    SuperType.call(this, name);
    this.age = age;
} 
SubType.prototype = new SuperType();
SubType.prototype.sayAge = function() {
    alert(this.age);
}
if (global) {
    global.alert = console.log;
}
let instance1 = new SubType("Nicholas", 29);
instance1.colors.push("black");
alert(instance1.colors);
instance1.sayName();
instance1.sayAge();
let instance2 = new SubType("Greg", 28);
alert(instance2.colors);
instance2.sayName();
instance2.sayAge();
