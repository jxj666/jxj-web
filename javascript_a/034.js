//打乱一个数组2
var arr = [1, 2, 3, 4, 5];
var arr2 = [];
var l = arr.length;
for (var i = 0; i < l; i++) {
    var l2 = arr.length;
    var k = Math.floor(Math.random() * l2);
    arr2.push(arr[k]);
    arr.splice(k, 1);
}