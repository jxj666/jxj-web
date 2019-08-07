/*
 * @Description:
 * @Author: 靳小健
 * @Email: jinxiaojian@youxin.com
 * @LastEditors: 靳小健
 * @Date: 2018-08-15 11:34:44
 * @LastEditTime: 2019-03-05 16:26:02
 */
//node 错误捕获

(function run() {
  console.log("应用在运行");
  setTimeout(() => run(), 1000);
})();
let syncError = () => {
  throw new Error("sync error");
};
let asyncError = () => {
  setTimeout(() => {
    throw new Error("async error");
  }, 2000);
};
try {
  syncError();
} catch (err) {
  console.log(err);
}
asyncError();
process.on("uncaughtException", err => {
  console.log(err);
});
