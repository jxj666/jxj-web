'use strict';
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
//初试例子
var Student = /** @class */ (function () {
    function Student(first, middle, last) {
        this.first = first;
        this.middle = middle;
        this.last = last;
        this.full = first + " " + middle + " " + last;
    }
    return Student;
}());
function greeter(person) {
    return "hello " + person.first;
}
var user = new Student('a', 'b', 'c');
//字符串特性
var myName = "jin xiao jian";
function getName(name) {
    return name;
}
console.log("hello (" + getName(myName) + ")");
//函数参数确定
function test(a, b, c) {
    if (c === void 0) { c = '5'; }
    console.log(a, b || 1, c);
}
test('1');
//函数的参数处理
function arg_list() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    args.forEach(function (arg) {
        console.log(arg);
    });
}
arg_list(1, 2, 3);
arg_list(1);
var args_1 = [6, 6];
arg_list.apply(void 0, args_1);
function arg_list02() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var a = args[0];
    var b = args[1];
    var c = args[2] || 1;
    console.log(a, b, c);
}
var args_2 = ['8', false, 1, 2, 3];
var args_3 = ['2', true];
arg_list02.apply(void 0, args_2);
arg_list02.apply(void 0, args_3);
// //es6
// function arg_list03(a,b,c){
//     console.log(a,b,c);
// }
// var args_4=[1,2,3];
// var args_5=[1,2];
// arg_list03(...args_4);
// arg_list03(...args_5);
//generator
// //es6
// function* ge() {
//     console.log('start')
//     yield;
//     console.log('end')
// }
// var fu1=ge();
// fu1.next();
// fu1.next();
// function* getprice(company){
//     while(true){
//         yield Math.random()*100;
//     }
// }
// var price_num=getprice("IBM");
// var limit=15;
// var price=100;
// while(price>limit){
//     price=price_num.next().value;
//     console.log(`${price}`);
// }
// console.log(price)
//析构表达式
function getobj() {
    return {
        code: 'ibm',
        price: { price1: 1, price2: 2 }
    };
}
var _a = getobj(), my_code = _a.code, my_price = _a.price.price2;
console.log(my_code, my_price);
var arr1 = [1, 2, 3, 4];
var number1 = arr1[0], number2 = arr1[1];
var number3 = arr1[2], number4 = arr1[3];
var number_1 = arr1[0], others = arr1.slice(1);
//箭头函数
var arr3 = [1, 2, 3, 4, 5];
console.log(arr3.filter(function (value) { return value % 3 == 0; }));
// //es5
// function getnum(name:string){
//     var _this=this;
//     _this.name=name;
//     setTimeout(function(){
//         console.log(_this.name);
//     },1000)
// }
// var num=getnum('jxj');
function getnum(name) {
    var _this = this;
    if (name === void 0) { name = 'jxj'; }
    this.name = name;
    setTimeout(function () {
        console.log(_this.name);
    }, 1000);
}
var num = getnum();
//for of
var arr = [1, 2, 3, 4, 5];
for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
    var n = arr_1[_i];
    if (n > 2)
        break;
    console.log(n);
}
//类
//public private protected
var people = /** @class */ (function () {
    function people(name) {
        this.name = name;
    }
    people.prototype.eat = function () {
        console.log(this.name + 'eat');
    };
    return people;
}());
var coder = /** @class */ (function (_super) {
    __extends(coder, _super);
    function coder(name, number) {
        var _this = _super.call(this, name) || this;
        _this.number = number;
        return _this;
    }
    coder.prototype.work = function () {
        _super.prototype.eat.call(this);
        this.dowork();
    };
    coder.prototype.dowork = function () {
        console.log('work');
    };
    return coder;
}(people));
var c1 = new coder('jxj', 1111);
//泛型
var workers = [];
workers[1] = new people('zhao');
workers[2] = new coder('qian', 1);
var person = /** @class */ (function () {
    function person(config) {
        this.config = config;
    }
    return person;
}());
var p1 = new person({
    name: 'sun',
    age: 19
});
var sheep = /** @class */ (function () {
    function sheep() {
    }
    sheep.prototype.eat = function () {
        console.log('i eat grass');
    };
    return sheep;
}());
var tiger = /** @class */ (function () {
    function tiger() {
    }
    tiger.prototype.eat = function () {
        console.log('i eat sheep');
    };
    return tiger;
}());
//ts 模块
var test_2_1 = require("./test_2");
console.log(test_2_1.prop1);
