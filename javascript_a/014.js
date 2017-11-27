// 并归排序
//大事化小
// recursion merge

//递归
function recursion(arr) {
    var length = arr.length;
    if (length < 2) {
        return arr;
    }
    var middle_str = Math.floor(length / 2);
    var left_arr = arr.slice(0, middle_str);
    var right_arr = arr.slice(middle_str);
    return merge(recursion(left_arr), recursion(right_arr));
}

//合并
function merge(left_arr, right_arr) {
    var result_arr = [];
    while (left_arr.length && right_arr.length) {
        if (left_arr[0] <= right_arr[0]) {
            result_arr.push(left_arr.shift());
        } else {
            result_arr.push(right_arr.shift());
        }
    }
    while (left_arr.length) {
        result_arr.push(left_arr.shift());
    }
    while (right_arr.length) {
        result_arr.push(right_arr.shift());
    }
    return result_arr;
}


var arr = [1, 11, 3, 33, 2, 22];
recursion(arr);