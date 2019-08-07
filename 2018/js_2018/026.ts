//定义类
class Student {
    full: string;
    constructor(public first: string, public last: string) {
        this.full = this.first + ' ' + this.last;
    }
}
//定义接口类型
interface Person {
    first: string;
    last: string;
}
// 函数
function geeter(person: Person) {
    return `hello ${person.first} ${person.last}`;
}
//实例化
var user = new Student('jin', 'xiaojian');
//应用
document.body.innerHTML = geeter(user);

