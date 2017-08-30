//'error'事件监听
const Koa = require('koa');
const app = new Koa();

const main = ctx => {
  ctx.throw(500);
};

app.on('error', (err, ctx) => {
  console.error('set server error', err);
});

app.use(main);
app.listen(9696);
