/*
 * @Description:
 * @Author: 靳小健
 * @Email: jinxiaojian@youxin.com
 * @LastEditors: 靳小健
 * @Date: 2018-08-15 11:34:44
 * @LastEditTime: 2019-03-05 16:30:25
 */
function imPromise(num) {
  return new Promise((resolve, reject) => {
    if (num > 0.5) {
      resolve(1);
    } else {
      reject(0);
    }
  });
}
imPromise(Math.random())
  .then(v => {
    console.log(v, 1);
  })
  .catch(v => {
    console.log(v, 0);
  });
