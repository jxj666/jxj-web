//选择排序
//选择最小 远程交换

function select() {
    var arr1 = this;
    var min;
    for (var i = 0; i < arr1.length - 1; i++) {
        var min = i;
        for (var j = i + 1; j < arr1.length; j++) {
            if (arr1[j] < arr1[min]) {
                min = j;
            }
        }
        arr[i] = [arr[min], arr1[min] = arr[i]][0];
    }
    return arr1;
}
var arr = [1, 11, 3, 33, 2, 22];
select.apply(arr);


function select(arr) {
    var min;
    for (var i = 0; i < arr.length - 1; i++) {
        var min = i;
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[min]) {
                min = j;
            }
        }
        arr[i] = [arr[min], arr[min] = arr[i]][0];
    }
}
var arr = [3, 2, 1];
select(arr);