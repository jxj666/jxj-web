// 年龄排序

var man = [{ name: 'a', age: 11 }, { name: 'b', age: 15 }, { name: 'c', age: 13 }];
var manSort = man.sort(function(a, b) {
    return a.age - b.age;
});