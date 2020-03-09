/*
 * @Description:
 * @Author: jinxiaojian
 * @Email: jinxiaojian@youxin.com
 * @Date: 2020-03-09 11:27:27
 * @LastEditTime: 2020-03-09 11:38:43
 * @LastEditors: 靳肖健
 */

function newStr (str) {
  return str.replace(/[\w]/g, (x) => {
    return /[a-z]/.test(x) ? x.toUpperCase() : x.toLowerCase()
  })
}
newStr('aBc')