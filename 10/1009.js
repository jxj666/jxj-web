1单选(2分)
以下代码执行完成后president.name的值是
function setName(obj){
    obj.name = "obama";
    obj = {name:"clinton"};
}
var president = {name:"bush"};
setName(president);

得分/总分

A.
"bush"

0.00/2.00

B.
undefined


C.
null


D.
"obama"

正确答案：D你错选为A
2单选(2分)
以下代码执行后a、b的值分别是
var str = "welcome to NetEase!welcome to MOOC!";
var a = str.indexOf("to");
var b = str.indexOf("to", a+1);

得分/总分

A.
27, 8


B.
8, 27

2.00/2.00

C.
8, -1


D.
-1,27

正确答案：B你选对了
3单选(2分)
以下代码执行后a,b的值分别是
var a = 0;
var b = false&&a++;

得分/总分

A.
1，1

B.
1，0

C.
0，false
2.00/2.00

D.
0，1
正确答案：C你选对了
4单选(2分)
以下表达式返回结果分别是
1&&0

得分/总分

A.
0
2.00/2.00

B.
NaN

C.
false

D.
1
正确答案：A你选对了
5单选(2分)
以下代码执行后，arr和result的值分别是
var arr = [1,2,3]; 
var result = arr.shift(); 

得分/总分

A.
[1,2,3] 和 1

B.
[1,2,3] 和 3

C.
[2,3] 和 1
2.00/2.00

D.
[2,3] 和 3
正确答案：C你选对了
6单选(2分)
以下不是Number类型的是
得分/总分

A.
"4"
2.00/2.00

B.
0x9F

C.
10

D.
056
正确答案：A你选对了
7单选(2分)
以下代码执行后,total的值为
var total = 0,
    i = 5;
do{
  total += i++;
}while(i < 7)
得分/总分

A.
6

B.
11
2.00/2.00

C.
7

D.
0
正确答案：B你选对了
8单选(2分)
以下代码执行后a的值为:
var a = 10;
function fn(x){
	return --x;
}
fn(a);
得分/总分

A.
8

B.
10

C.
11

D.
undefined
0.00/2.00
正确答案：B你错选为D
9单选(2分)
以下代码执行后a的值为:
var a = JSON.stringify({name: "jerry", age: 1, nick: undefined, tags: null});
得分/总分

A.
'{"name":"jerry","age":1 }'

B.
'{"name":"jerry","age":1,"nick":undefined,"tags":null }'

C.
'{"name":"jerry","age":1,"tags":null}'
2.00/2.00

D.
'{"name":"jerry","age":"1","nick":"undefined","tags":"null" }'
正确答案：C你选对了
10单选(2分)
以下代码执行后circle的值为:
var circle = {x: 1, y: 0, r: 5};
function move(shape, stepX, stepY){
	shape.x = shape.x + stepX;
	shape.y = shape.y + stepY;
	return shape
}
move(circle, -2, 3);
得分/总分

A.
{x: 1, y: 3, r: 5}

B.
{x: 4, y: -2, r: 5}

C.
{x: -1, y: 3, r: 5}
2.00/2.00

D.
{x: 1, y: -3, r: 5}
正确答案：C你选对了
11多选(4分)
以下表达式中返回结果是true的有
得分/总分

A.
"123"== 123
1.33/4.00

B.
new String("123") == new String("123")

C.
new String("123") == "123"
1.33/4.00

D.
false == "0"
1.33/4.00
正确答案：A、C、D你选对了
12填空(2分)
var obj = Object.create({a:1});
obj.hasOwnProperty('a')返回结果是___


得分/总分

true
 0.00/2.00
正确答案：false
13填空(2分)
以下代码实现了让数值x保留两位小数，请补全代码：
var x = 3.14159;
x = Number(x.____________(2));
得分/总分

ceil
 0.00/2.00
正确答案：toFixed
14填空(2分)
new Date(2015, 10, 0).getDate() 的值为_____________
得分/总分

30
 0.00/2.00
正确答案：31
15填空(2分)
以下代码执行后:
var ms = "share.jpeg".match(/^(?:[^.]+)\.(png|gif|jpg|jpeg)/);
ms[1]的值为"______"

得分/总分

-1
 0.00/2.00
正确答案：jpeg