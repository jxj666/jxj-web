// 并归排序
//大事化小
// recursion merge

function recursion(arr) {
    var length = arr.length;
    if (length < 2) {
        return arr;
    }
    var middle = Math.floor(length / 2);
    var left = arr.slice(0, middle);
    var right = arr.slice(middle);
    return merge(recursion(left), recursion(right));

}

function merge(left, right) {
    var result = [];
    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }
    while (left.length) {
        result.push(left.shift());
    }
    while (right.length) {
        result.push(right.shift());
    }
    return result;
}
var arr = [1, 11, 3, 33, 2, 22];
recursion(arr);