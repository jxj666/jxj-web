/*
 * @Description:
 * @Author: 靳小健
 * @Email: jinxiaojian@youxin.com
 * @LastEditors: 靳小健
 * @Date: 2018-08-15 11:34:44
 * @LastEditTime: 2019-03-05 16:30:30
 */
async function imAsync(num) {
  if (num > 0.5) {
    return num;
  } else {
    throw num;
  }
}

imAsync(Math.random())
  .then(v => {
    console.log(v, 1);
  })
  .catch(v => {
    console.log(v, 0);
  });
