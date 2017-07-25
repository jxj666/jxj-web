# es6 常用新特性


## 箭头函数
```
var arr1=[1,2,3]
arr1.forEach((v,a) => console.log(a,v))
```

## 字符串模板
```
var num=Math.random();
console.log(`随机数${num}`)
```

## let const
```
const i1=1;
for(let i2=0;i2<2;i2++){
    console.log(i2)
}
console.log(i1)
console.log(i2)
```

## 类的支持

class关键字：JS本身就是面向对象的，ES6中提供的类实际上只是JS原型模式的包装。
现在提供原生的class支持后，对象的创建，继承更加直观了，并且父类方法的调用，实例化，静态方法和构造函数等概念都更加形象化。

```
//类的定义
class Animal {
    //ES6中新型构造器
    constructor(name) {
        this.name = name;
    }
    //实例方法
    sayName() {
        console.log('My name is '+this.name);
    }
}
//类的继承
class Programmer extends Animal {
    constructor(name) {
        //直接调用父类构造器进行初始化
        super(name);
    }
    program() {
        console.log("I'm coding...");
    }
}
```
