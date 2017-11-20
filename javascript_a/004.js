//CMD
define(function(require,exports,module){
	var a=require('./a');
	a.fun();
	var b=require('./b');
	b.fun();
})


//AMD
define(['./a','./b'],function(a,b){
	a.fun();
	b.fun();
})


//CommonJS
//a.js
exports.fun1 = function() {
};
//b.js
var fun1 = require('a').fun1;
exports.fun2 = function() {
    fun1();
}
//c.js
var fun2 = require('b').fun2;
fun2();