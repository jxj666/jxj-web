/*
 * @Description: 
 * @Author: jinxiaojian
 * @Email: jinxiaojian@youxin.com
 * @Date: 2019-07-29 10:52:16
 * @LastEditTime: 2019-07-29 15:24:13
 * @LastEditors: 靳肖健
 */

//因为声明的多个函数都需要数据长度,所以把len设置成为全局变量
var len;

//二叉树调整->建立大顶堆
function buildMaxHeap (arr) {
  len = arr.length;
  var key = Math.floor(len / 2);
  for (var i = key; i >= 1; i--) {
    heapify(arr, i);//堆调整
  }
}

//子树调整
function heapify (arr, i) {
  var left = 2 * i, right = 2 * i + 1, father = i;
  if (left <= len && arr[left - 1] > arr[father - 1]) { father = left; }
  if (right <= len && arr[right - 1] > arr[father - 1]) { father = right; }
  if (father != i) {
    swap(arr, i - 1, father - 1);
    // //二叉树整形为堆,排序可省略
    // heapify(arr, father);
  }
}

//数组对调
function swap (arr, i, j) {
  // es6数组对调
  [arr[i], arr[j]] = [arr[j], arr[i]];
  //es3数组对调
  // arr[i] = [arr[j], arr[j] = arr[i]][0]
}

//堆排序
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
