//原生路由
const Koa = require('koa');
const fs=require('fs');
const app = new Koa();

const main=ctx=>{
	if(ctx.request.path !== '/'){
		ctx.response.type='html';
		ctx.response.body='<h1>不在主页</h1><a href="/">back</a>'
	}else{
		ctx.response.type='html';
		ctx.response.body=fs.createReadStream('./demos/index.html')
	}
};

app.use(main);
app.listen(9871);
