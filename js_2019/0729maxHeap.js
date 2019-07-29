/*
 * @Description: 
 * @Author: jinxiaojian
 * @Email: jinxiaojian@youxin.com
 * @Date: 2019-07-29 10:52:16
 * @LastEditTime: 2019-07-29 14:57:15
 * @LastEditors: 靳肖健
 */
var len;
//因为声明的多个函数都需要数据长度,所以把len设置成为全局变量
function buildMaxHeap (arr) { //建立大顶堆
  len = arr.length;
  var key = Math.floor(len / 2);
  for (var i = key; i >= 1; i--) {
    heapify(arr, i);//堆调整
  }
}
function heapify (arr, i) {
  var left = 2 * i, right = 2 * i + 1, father = i;
  if (left <= len && arr[left - 1] > arr[father - 1]) { father = left; }
  if (right <= len && arr[right - 1] > arr[father - 1]) { father = right; }
  if (father != i) {
    swap(arr, i - 1, father - 1);
    // //堆整形,排序可省略
    // heapify(arr, father);
  }
}
function swap (arr, i, j) {
  // es6数组对调
  [arr[i], arr[j]] = [arr[j], arr[i]];
  //es3数组对调
  // arr[i] = [arr[j], arr[j] = arr[i]][0]
}
function heapSort (arr) {
  var arr1 = arr
  var arr2 = []
  var sort = arr.length
  for (var i = 0; i < sort; i++) {
    buildMaxHeap(arr1)
    // console.log(arr1)
    arr2.unshift(arr1.shift())
  }
  return arr2;
}
