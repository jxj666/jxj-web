// es6 object


// 简写
let birth = '1999/09/09';
const person = {
    name: 'aaa',
    birth,
    hello() {
        console.log(`my name is ${this.name}`)
    }
};


// > CommonJS 输出模块简写
let ms = {};

function getItem(key) {
    return key in ms ? ms[key] : null;
}

function setItem(key, value) {
    ms[key] = value;
}

function clear() {
    ms = {};
}
module.exports = { getItem, setItem, clear };


// > generator函数
const obj = {
    * m() {
        yield `hello world`;
    }
};

//属性表达式
let propKey = 'foo';
ler obj = {
    ['porpKey']: true,
    ['a' + 'b']: 123
};


//属性表达式不可与简写共用
const foo = 'bar';
const baz = {
    [foo]: abc
};