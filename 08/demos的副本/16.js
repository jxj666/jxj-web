//处理错误的中间键

// try 语句测试代码块的错误。
// catch 语句处理错误。
// throw 语句创建自定义错误。

const Koa = require('koa');
const app = new Koa();

const handler = async(ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.response.status = err.statusCode || err.status || 500;
        ctx.response.body = {
            message: err.message,
            statusCode: err.statusCode,
            status: err.status
        };
    }
};

const main = ctx => {
    ctx.throw(500);
};

app.use(handler);
app.use(main);
app.listen(9963);