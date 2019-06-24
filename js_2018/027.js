/*
 * @Description:
 * @Author: 靳小健
 * @Email: jinxiaojian@youxin.com
 * @LastEditors: 靳小健
 * @Date: 2018-08-15 11:34:44
 * @LastEditTime: 2019-03-05 16:26:34
 */
// generator
// function test(a:string='z',b?:string,c:string='z'){
// 	console.log(a,b,c)
// }
// test();
// function* fun(){
// console.log('1');
// yield;
// console.log('2');
// }
// var fun1=fun();
// fun1.next();
// fun1.next();
// var target = get_value('mi');
// var target_value = 15;
// var now_value = 100;
// function* get_value(name) {
//     while (true) {
//         yield Math.random() * 100;
//     }
// }
// while (now_value > target_value) {
//     now_value = (target.next().value + now_value) / 2;
//     console.log(`now:${now_value}`);
// }
// console.log(`get:${now_value}`);
function get_info() {
  return {
    code: "mi",
    price: {
      price1: 200,
      price2: 100,
    },
    age: 1,
  };
}
var _a = get_info(),
  code_0 = _a.code,
  price1 = _a.price.price1;
var arr1 = [1, 2, 3, 4, 5];
var num1 = arr1[0],
  num3 = arr1[2],
  others = arr1.slice(3);
