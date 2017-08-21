//返回网页
const fs = require('fs');
const Koa = require('koa');
const app = new Koa();

const main = ctx => {
  ctx.response.type = 'html';
  ctx.response.body = fs.createReadStream('./demos/index.html');
};

app.use(main);
app.listen(9875);
