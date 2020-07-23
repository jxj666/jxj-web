/*
 * @LastEditTime: 2020-07-09 19:55:17
 * @LastEditors: jinxiaojian
 */
function moveArr (arr, k) {
  for (let i = 0; i < k; i++) {
    let ele = arr.pop()
    arr.unshift(ele)
  }
  return arr
}