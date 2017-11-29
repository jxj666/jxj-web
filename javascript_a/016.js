// 快速排序

//quick swap part

function quick(arr) {
    var left_arr = [];
    var right_arr = [];
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] < arr[0]) {
            left_arr.push(arr[i]);
        } else {
            right_arr.push(arr[i]);
        }
    }
    if (left_arr.length > 1) {
        left_arr=quick(left_arr);
    }
    if (right_arr.length > 1) {
        right_arr=quick(right_arr);
    }
    arr1 = left_arr.concat(arr[0], right_arr);
    console.log(arr1);
    return arr1;
}


var arr = [1,11,3,33,2,22];
quick(arr);