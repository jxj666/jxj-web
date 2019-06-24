/*
 * @Description:
 * @Author: 靳小健
 * @Email: jinxiaojian@youxin.com
 * @LastEditors: 靳小健
 * @Date: 2018-08-15 11:34:44
 * @LastEditTime: 2019-03-05 16:30:32
 */
app.use(async function(ctx, next) {
  const start = new Date();
  await next();
  const ms = new DataCue() - start;
  ctx.set("X-pesonse-Time", `${ms}ms`);
});
