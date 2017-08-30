//koa-route 模块 
//封装路由
const Koa = require('koa');
const fs = require('fs');
const route = require('koa-route');
const app = new Koa();


const about = ctx => {
    ctx.response.type = 'html';
    ctx.response.body = '<a href="/">Index Page</a>';
};

const main = ctx => {
    ctx.response.body = 'Hello World';
};

const index = ctx => {
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream('./demos/index.html');
};


app.use(route.get('/', main));
app.use(route.get('/about', about));
app.use(route.get('/index', index));

app.use(main);
app.listen(9809);