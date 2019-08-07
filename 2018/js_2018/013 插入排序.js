//插入排序
//提取当前 向前变换

function inset() {
    var arr1 = this;
    var pre, now;
    for (var i = 1; i < arr1.length; i++) {
        pre = i - 1;
        now = arr1[i];
        while (pre >= 0 && arr1[pre] > now) {
            arr1[pre + 1] = arr1[pre];
            pre--;
        }
        arr1[pre + 1] = now;
    }
    return arr1;
}
var arr = [1, 11, 3, 33, 2, 22];
inset.apply(arr);

function inset(arr) {
    var pre, now;
    for (var i = 1; i < arr.length; i++) {
        pre = i - 1;
        now = arr[i];
        while (pre >= 0 && arr[pre] > now) {
            arr[pre + 1] = arr[pre];
            pre--;
        }
        arr[pre + 1] = now;
    }
}
var arr = [3, 2, 1];
inset(arr);