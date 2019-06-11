/*
 * @Description: 
 * @Author: jinxiaojian
 * @Email: jinxiaojian@youxin.com
 * @Date: 2019-06-10 19:09:40
 * @LastEditTime: 2019-06-10 20:00:20
 * @LastEditors: 靳肖健
 */
const Koa = require('koa');
const fs = require('fs')
const app = new Koa();
let word = fs.createReadStream('./test1.html')
const main = ctx => {
  ctx.response.type = 'html';
  ctx.response.body = word;
};
app.use(main);
app.listen(3001);