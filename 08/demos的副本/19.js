//cookies

const Koa = require('koa');
const app = new Koa();

const main = function(ctx) {
    const n = Number(ctx.cookies.get('view') || 0) + 1;
    console.log(`${ctx.request.method},${ctx.request.url}`)
    ctx.cookies.set('view', n);
    ctx.response.body = n + ' views';
}

app.use(main);
app.listen(9915);