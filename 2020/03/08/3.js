function newArr(arr1, arr2) {
  var newArr = [];
  function toObj(arr) {
    var obj = {};
    arr.forEach(x => {
      if (obj[x]) {
        obj[x] += 1;
      } else {
        obj[x] = 1;
      }
    });
    return obj;
  }
  var obj1 = toObj(arr1);
  var obj2 = toObj(arr2);
  var x;
  for (x in obj1) {
    if (obj2[x]) {
      var key = obj1[x] < obj2[x] ? obj1[x] : obj2[x];
      for (var i = 0; i < key; i++) {
        newArr.push(x);
      }
    }
  }
  return newArr;
}
var nums1 = [1, 2, 2, 1];
var nums2 = [2, 2, 1];
newArr(nums1, nums2);
