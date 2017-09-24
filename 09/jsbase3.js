
函数myType用于根据输入参数返回相应的类型信息。
语法如下：
	var str = myType (param);
使用范例如下：
	myType (1);		返回值： "number"
	myType (false);		返回值： "boolean"
	myType ({});		返回值： "object"
	myType ([]);		返回值：" Array"
	myType (function(){});	返回值："function"
	myType (new Date());	返回值： "Date"
请写出函数myType的实现代码。

函数search用于在一个已排序的数字数组中查找指定数字。
语法如下：
	var index = search(arr, dst);
使用范例如下： 
	var arr = [1, 2, 4, 6, 7, 9, 19,20, 30, 40, 45, 47];
	search(arr, 45);		返回值： 10
请写出函数search的实现代码 请给出函数，要求不能使用Array的原型方法，且算法时间复杂度低于O(n)。


函数formatDate用于将日期对象转换成指定格式的字符串，语法如下：
	var str = formatDate(date, pattern);
	其中pattern的全格式为"yyyy-MM-dd HH:mm:ss"
使用范例如下：
	var date = new Date(2001, 8, 11, 8, 26, 8);
	formatDate(date, "yyyy");		返回值： "2001"
	formatDate(date, "yyyy-MM-dd");	    返回值： "2001-09-11"
	formatDate(date, "yyyy-MM-dd HH");		返回值： "2001-09-11 08"
	formatDate(date, "yyyy-MM-dd HH:mm:ss");    返回值： "2001-09-11 08:26:08"
请写出函数formatDate的实现代码。