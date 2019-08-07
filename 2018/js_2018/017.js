/*
 * @Description:
 * @Author: 靳小健
 * @Email: jinxiaojian@youxin.com
 * @LastEditors: 靳小健
 * @Date: 2018-08-15 11:34:44
 * @LastEditTime: 2019-03-05 16:27:28
 */
var age = "12";
var people = {
  name: "jxj",
};

function intro(num, obj) {
  num = "18";
  obj.name = "yy";
  console.log(num, obj);
}
intro(age, people);
console.log(age, people);
