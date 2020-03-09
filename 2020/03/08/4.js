// 随机生成一个长度为 10 的整数类型的数组，例如 [2, 10, 3, 4, 5, 11, 10, 11, 20]，将其排列成一个新数组，要求新数组形式如下，例如 [[2, 3, 4, 5], [10, 11], [20]]。
function newArr(oldArr) {
  var arr1 = oldArr.sort((a, b) => {
    return a - b;
  });
  arr1 = [...new Set(arr1)];
  var arr2 = [];
  var arr3 = [];
  var key = Math.floor(arr1[0] / 10);
  for (var i = 0; i < arr1.length; i++) {
    if (key == Math.floor(arr1[i] / 10)) {
    } else {
      arr3.push(arr2);
      arr2 = [];
      key = Math.floor(arr1[i] / 10);
    }
    arr2.push(arr1[i]);
  }
  arr3.push(arr2);
  console.log(arr3);
}
newArr([2, 10, 3, 4, 5, 11, 10, 11, 20]);
