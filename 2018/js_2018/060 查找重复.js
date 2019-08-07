// 查找重复

var arr = [1, 2, 3, 4, 5, 1, 2, 3, "1", "2", "3"];

function noOne(arr) {
    var obj = {};
    var new_arr = [];
    for (var i = 0; i < arr.length; i++) {
        if (!obj[`${arr[i]}_${typeof arr[i]}`]) {
            obj[`${arr[i]}_${typeof arr[i]}`] = {};
            obj[`${arr[i]}_${typeof arr[i]}`].value = arr[i];
            obj[`${arr[i]}_${typeof arr[i]}`].num = 1;
        } else {
            obj[`${arr[i]}_${typeof arr[i]}`].num += 1;
        }
    }
    console.log(obj);
    for (i in obj) {
        if (obj[i].num > 1) {
            new_arr.push(obj[i].value);
        }
    }
    return new_arr;
}

noOne(arr);