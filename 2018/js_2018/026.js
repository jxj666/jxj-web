//定义类
var Student = /** @class */ (function () {
    function Student(first, last) {
        this.first = first;
        this.last = last;
        this.full = this.first + ' ' + this.last;
    }
    return Student;
}());
// 函数
function geeter(person) {
    return "hello " + person.first + " " + person.last;
}
//实例化
var user = new Student('jin', 'xiaojian');
//应用
document.body.innerHTML = geeter(user);
