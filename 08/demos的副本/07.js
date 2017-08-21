//logger 中间键
const Koa = require('koa');
const app = new Koa();

const logger = ctx => {
    console.log(`${Date()} ${ctx.request.method} ${ctx.request.url}`);
   ctx.response.body = 'Hello World';

};

app.use(logger);
app.listen(9805);