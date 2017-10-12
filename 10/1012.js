1单选(2分)
以下表达式返回结果是
"1"-null+true

得分/总分

A.
1

B.
2

C.
0

D.
NaN
0.00/2.00
正确答案：B你错选为D
2单选(2分)
typeof([]) 的结果是
得分/总分

A.
"array"

B.
"Function"

C.
"Object"
0.00/2.00

D.
"object"
正确答案：D你错选为C
3单选(2分)
以下表达式返回结果是false的有
得分/总分

A.
[].constructor === Array

B.
(function(){}).constructor === Object
2.00/2.00

C.
"jerry".constructor === String

D.
true.constructor === Boolean
正确答案：B你选对了
4单选(2分)
以下语句执行后，a的值不是undefined的是
得分/总分

A.
var a = document.getElementById('notExistElement');

B.
var a = (function(){alert("test")})();
0.00/2.00

C.
var a;

D.
var a = (function(b){return b;})();
正确答案：A你错选为B
5单选(2分)
以下代码执行时两个alert分别输出值是
(function(){
a = 5;
alert(window.a);
var a = 10;
alert(a);
})();

得分/总分

A.
10, 10

B.
undefined, 10

C.
5, 10
0.00/2.00

D.
undefined, 5
正确答案：B你错选为C
6单选(2分)
以下代码执行时alert输出值是
var x=10;
function foo(){
alert(x);
}
function bar(){
var x=20;
foo();
}
bar();

得分/总分

A.
20

B.
undefined

C.
10
2.00/2.00

D.
null
正确答案：C你选对了
7单选(2分)
以下代码中的alert，分别输出什么结果
var a = 1;
var func = (function(){
var a = 2;
return function() { 
a++;
   alert(a);
}
})();
func();
func();

得分/总分

A.
undefined, undefined

B.
1, 2

C.
NaN, NaN

D.
3, 4
2.00/2.00
正确答案：D你选对了
8单选(2分)
eval函数中的this值是
得分/总分

A.
Function

B.
调用上下文中的this

C.
undefined

D.
全局对象
0.00/2.00
正确答案：B你错选为D
9多选(4分)
下列关于js描述正确的有
得分/总分

A.
js中可以使用prototype实现原型继承
1.33/4.00

B.
在对象构造器中，可以使用this创建对象的属性
1.33/4.00

C.
js中不能使用面向对象

D.
函数的apply和call方法可以指定函数执行中的this
1.33/4.00
正确答案：A、B、D你选对了
10判断(1分)
Js函数运行在它们被定义的作用域里
得分/总分

A.√1.00/1.00

B.×
正确答案：A你选对了
11判断(1分)
使用new Function()创建的函数代码中的this是全局对象
得分/总分

A.√1.00/1.00

B.×
正确答案：A你选对了
12判断(1分)
Js中所有函数都可以当成构造器
得分/总分

A.×

B.√0.00/1.00
正确答案：A你错选为B
13判断(1分)
catch语句可以临时改变js变量作用域
得分/总分

A.×0.00/1.00

B.√
正确答案：B你错选为A
14判断(1分)
Js使用动态作用域
得分/总分

A.×1.00/1.00

B.√
正确答案：A你选对了
15判断(1分)
Js有块级作用域
得分/总分

A.×1.00/1.00

B.√
正确答案：A你选对了
16填空(2分)
以下代码用于判断user对象就有自身属性name，请补全代码：
user.                          (“name”);

得分/总分

hasOwnProperty
 2.00/2.00
正确答案：hasOwnProperty
17填空(2分)
以下代码在浏览器中运行弹出的结果依次是（以空格分割）：____________________
function Teacher() {}
Teacher.prototype = {
job: 'teacher',
setName: function(name) {
this.name = name;
}
}
var bill = new Teacher();
bill.setName('Bill');
alert(bill.name);
alert(bill.job);
bill.job='assistant';
alert(bill.job);
delete bill.job;
alert(bill.job);

得分/总分

bill,teacher,assistant,assistant
 0.00/2.00
正确答案：Bill teacher assistant teacher