//设置返回文本
const Koa = require('koa');
const app = new Koa();

const main=ctx=>{
	ctx.response.body='ni hao!'
};

app.use(main);
app.listen(8008);
