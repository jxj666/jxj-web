// 实现type函数用于识别标准类型和内置对象类型，语法如下：
// var t = type(obj);
// 使用举例如下：
// var t = type(1) // t==="number"
// var t = type(new Number(1)) // t==="number"
// var t = type("abc") // t==="string"
// var t = type(new String("abc")) // t==="string"
// var t = type(true) // t==="boolean"
// var t = type(undefined) // t==="undefined"
// var t = type(null) // t==="null"
// var t = type({}) // t==="object"
// var t = type([]) // t==="array"
// var t = type(new Date) // t==="date"
// var t = type(/\d/) // t==="regexp"
// var t = type(function(){}) // t==="function"

function type(obj) {
    var text = `t === "${Object.prototype.toString.call(obj).slice(8,-1).toLowerCase()}"`;
    return text;
}

// 定义的Object.create1(proto)方法，会创建并返回一个新的对象，这个新的对象以传入的proto对象为原型。
// 语法如下：
//     Object.create1(proto)  （注：第二个参数忽略）
//         proto —— 作为新创建对象的原型对象
// 使用示例如下：
//     var a = Object.create1({x: 1, y: 2});
//     alert(a.x);


if (!Object.create1) {
    Object.create1 = function() {
        function F() {}
        return function(proto) {
            F.prototype = proto;
            return new F();
        }
    }
}