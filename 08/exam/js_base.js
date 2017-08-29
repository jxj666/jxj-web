// 函数random用于生成0-999之间的随机整数。
// 语法如下：
//     var number = random();
//     number是0-999之间的整数。

function random() {
    return Math.floor(Math.random() * 1000)
}

// 函数parseQuery用于解析url查询参数。
// 语法如下：
// 	var obj = parseQuery(query)
// 	query是被解析的查询参数，函数返回解析后的对象。
// 使用范例如下：
// 	var jerry = parseQuery("name=jerry&age=1");
// 	jerry; 	返回值：{name: " jerry ", age: "1"}
// 	var tom = parseQuery("name= tom &age=12&gender&");
// 	tom; 	返回值：{name: "tom", age: "12", gender: ""}
// 请写出函数parseQuery的实现代码。

function parseQuery(query) {
    var arr = query.split('&')
    var obj = {}
    for (var i = 0; i < arr.length; i++) {
        var arr2 = arr[i].split('=')
        if (arr2[0]) { obj[arr2[0]] = arr2[1] || '' }
    }
    return obj
}

// 函数multiply用于计算多个数字的乘积。
// 语法如下：
// 	var product = multiply (number0, number1[, number2, ….])；
// 使用范例如下：
// 	multiply(2, 3);	 返回值： 6
// 	multiply(-1, 3, 4);	返回值： -12
// 	multiply(1, 2, 3, 4, 5);    返回值： 120
// 请写出函数multiply的实现代码。

function multiply() {
    var arr = arguments
    var num = 1
    for (var i = 0; i < arr.length; i++) {
        num *= arr[i]
    }
    return num
}

// 构造函数Person用于构造人，语法如下：
// function Person(name, age){
// 	// 函数体
// }
// 使用范例如下：
// 	var jerry = new Person("Jerry", 2);
// 	jerry.introduce();		返回值： "I am Jerry, I am 2 years old! "
// var tom = new Person("Tom", 12);
// 	tom.introduce();		返回值： "I am Tom, I am 12 years old! "
// 请写出构造函数Person的实现代码
function Person(name, age) {
    this.name = name
    this.age = age
    this.introduce = function() {
        var intro = `i am ${name} , i am ${age} years old`
        return intro
    }
}

// 函数escapeHTML用于转义html字符串中的特殊字符(<>"&)。
// 语法如下：
// 	var escapedStr = escapeHTML(htmlStr);
// 使用范例如下：
// 	escapeHTML('<div>Tom&Jerry</div> '); 		
// 	返回值：
// 		'&lt;div&gt;Tom&amp;Jerry&lt;/div&gt; '
// 	escapeHTML('<input type="text" name="mobile"> '); 		
// 	返回值：
// 		'&lt;inputtype=&quot;text&quot; name=&quot;mobile&quot;&gt; '
// 请写出函数escapeHTML的实现代码。
function escapeHTML(htmlStr) {
    var new_str = htmlStr.replace(/[<>"&]/g, function(str) {
        switch (str) {
            case '<':
                return '&lt;'

            case '>':
                return '&gt;'

            case '"':
                return '&quot;'

            case '&':
                return '&amp;'
        }
    })
    return new_str
}