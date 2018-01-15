'use strict';
//初试例子
class Student {
    full: string;
    constructor(public first: string, public middle: string, public last: string) {
        this.full = `${first} ${middle} ${last}`;
    }
}

interface Person {
    first: string;
    last: string;
}

function greeter(person: Person) {
    return `hello ${person.first}`;
}

var user = new Student('a', 'b', 'c');

//字符串特性
var myName = `jin xiao jian`;

function getName(name) {
    return name;
}
console.log(`hello (${getName(myName)})`)

//函数参数确定

function test(a: string, b ? : string, c: string = '5') {
    console.log(a, b || 1, c)
}
test('1')

//函数的参数处理
function arg_list(...args) {
    args.forEach(function(arg) {
        console.log(arg);
    })
}
arg_list(1, 2, 3);
arg_list(1);
var args_1 = [6, 6];
arg_list(...args_1);

function arg_list02(...args) {
    var a: string = args[0];
    var b: boolean = args[1];
    var c: number = args[2] || 1;
    console.log(a, b, c);
}
var args_2 = ['8', false, 1, 2, 3];
var args_3 = ['2', true]
arg_list02(...args_2);
arg_list02(...args_3);
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
    }
}
var { code: my_code, price: { price2: my_price } } = getobj();
console.log(my_code, my_price);

var arr1 = [1, 2, 3, 4];
var [number1, number2] = arr1;
var [, , number3, number4] = arr1;
var [number_1, ...others] = arr1;

//箭头函数
var arr3 = [1, 2, 3, 4, 5];
console.log(arr3.filter(value => value % 3 == 0));

// //es5
// function getnum(name:string){
//     var _this=this;
//     _this.name=name;
//     setTimeout(function(){
//         console.log(_this.name);
//     },1000)
// }
// var num=getnum('jxj');

function getnum(name: string = 'jxj') {
    this.name = name;
    setTimeout(() => {
        console.log(this.name);
    }, 1000);

}
var num = getnum();
//for of
var arr = [1, 2, 3, 4, 5]
for (var n of arr) {
    if (n > 2) break;
    console.log(n);
}

//类
//public private protected
class people {

    constructor(public name: string) {}

    eat() {
        console.log(this.name + 'eat');
    }
}

class coder extends people {

    constructor(name: string, public number: number) {
        super(name);
    }
    work() {
        super.eat();
        this.dowork();
    }
    private dowork() {
        console.log('work');
    }

}
var c1 = new coder('jxj', 1111);

//泛型
var workers: Array < people > = [];
workers[1] = new people('zhao');
workers[2] = new coder('qian', 1);

//接口 interface

interface key_arg {
    name: string;
    age: number;
}
class person{
    constructor(public config:key_arg){

    }
}
var p1=new person({
    name:'sun',
    age:19
});

interface animal{
    eat();
}

class sheep implements animal{
    eat(){
        console.log('i eat grass');
    }
}
class tiger implements animal{
    eat(){
        console.log('i eat sheep');
    }
}

//ts 模块

import {prop1,func1,class1} from './test_2'
console.log(prop1);

//ts 注解 annotation
//ts 类型定义文件

